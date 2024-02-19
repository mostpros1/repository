// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __extends } from "tslib";
import { AnalyticsAction, ConsoleLogger as Logger } from '@aws-amplify/core';
import { AWSKinesisProvider } from './AWSKinesisProvider';
import { PutRecordBatchCommand, FirehoseClient, } from '@aws-sdk/client-firehose';
import { fromUtf8 } from '@aws-sdk/util-utf8-browser';
import { getAnalyticsUserAgent } from '../utils/UserAgent';
var logger = new Logger('AWSKineisFirehoseProvider');
var AWSKinesisFirehoseProvider = /** @class */ (function (_super) {
    __extends(AWSKinesisFirehoseProvider, _super);
    function AWSKinesisFirehoseProvider(config) {
        return _super.call(this, config) || this;
    }
    /**
     * get provider name of the plugin
     */
    AWSKinesisFirehoseProvider.prototype.getProviderName = function () {
        return 'AWSKinesisFirehose';
    };
    AWSKinesisFirehoseProvider.prototype._sendEvents = function (group) {
        var _this = this;
        if (group.length === 0) {
            return;
        }
        var _a = group[0], config = _a.config, credentials = _a.credentials;
        var initClients = this._init(config, credentials);
        if (!initClients)
            return false;
        var records = {};
        group.map(function (params) {
            // split by streamName
            var evt = params.event;
            var streamName = evt.streamName, data = evt.data;
            if (records[streamName] === undefined) {
                records[streamName] = [];
            }
            var bufferData = data && typeof data !== 'string' ? JSON.stringify(data) : data;
            var Data = fromUtf8(bufferData);
            var record = { Data: Data };
            records[streamName].push(record);
        });
        Object.keys(records).map(function (streamName) {
            logger.debug('putting records to kinesis', streamName, 'with records', records[streamName]);
            _this._kinesisFirehose
                .send(new PutRecordBatchCommand({
                Records: records[streamName],
                DeliveryStreamName: streamName,
            }))
                .then(function (res) { return logger.debug('Upload records to stream', streamName); })
                .catch(function (err) { return logger.debug('Failed to upload records to Kinesis', err); });
        });
    };
    AWSKinesisFirehoseProvider.prototype._init = function (config, credentials) {
        logger.debug('init clients');
        if (this._kinesisFirehose &&
            this._config.credentials &&
            this._config.credentials.sessionToken === credentials.sessionToken &&
            this._config.credentials.identityId === credentials.identityId) {
            logger.debug('no change for analytics config, directly return from init');
            return true;
        }
        this._config.credentials = credentials;
        var region = config.region;
        return this._initFirehose(region, credentials);
    };
    AWSKinesisFirehoseProvider.prototype._initFirehose = function (region, credentials) {
        logger.debug('initialize kinesis firehose with credentials', credentials);
        this._kinesisFirehose = new FirehoseClient({
            apiVersion: '2015-08-04',
            region: region,
            credentials: credentials,
            customUserAgent: getAnalyticsUserAgent(AnalyticsAction.Record),
        });
        return true;
    };
    return AWSKinesisFirehoseProvider;
}(AWSKinesisProvider));
export { AWSKinesisFirehoseProvider };
//# sourceMappingURL=AWSKinesisFirehoseProvider.js.map