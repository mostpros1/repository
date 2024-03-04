// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __awaiter, __generator } from "tslib";
import { ConsoleLogger as Logger, Credentials, AnalyticsAction, } from '@aws-amplify/core';
import { KinesisClient, PutRecordsCommand } from '@aws-sdk/client-kinesis';
import { fromUtf8 } from '@aws-sdk/util-utf8-browser';
import { getAnalyticsUserAgent } from '../utils/UserAgent';
var logger = new Logger('AWSKinesisProvider');
// events buffer
var BUFFER_SIZE = 1000;
var FLUSH_SIZE = 100;
var FLUSH_INTERVAL = 5 * 1000; // 5s
var RESEND_LIMIT = 5;
var AWSKinesisProvider = /** @class */ (function () {
    function AWSKinesisProvider(config) {
        this._buffer = [];
        this._config = config || {};
        this._config.bufferSize = this._config.bufferSize || BUFFER_SIZE;
        this._config.flushSize = this._config.flushSize || FLUSH_SIZE;
        this._config.flushInterval = this._config.flushInterval || FLUSH_INTERVAL;
        this._config.resendLimit = this._config.resendLimit || RESEND_LIMIT;
        this._setupTimer();
    }
    AWSKinesisProvider.prototype._setupTimer = function () {
        var _this = this;
        if (this._timer) {
            clearInterval(this._timer);
        }
        var _a = this._config, flushSize = _a.flushSize, flushInterval = _a.flushInterval;
        this._timer = setInterval(function () {
            var size = _this._buffer.length < flushSize ? _this._buffer.length : flushSize;
            var events = [];
            for (var i = 0; i < size; i += 1) {
                var params = _this._buffer.shift();
                events.push(params);
            }
            _this._sendFromBuffer(events);
        }, flushInterval);
    };
    /**
     * get the category of the plugin
     */
    AWSKinesisProvider.prototype.getCategory = function () {
        return 'Analytics';
    };
    /**
     * get provider name of the plugin
     */
    AWSKinesisProvider.prototype.getProviderName = function () {
        return 'AWSKinesis';
    };
    /**
     * configure the plugin
     * @param {Object} config - configuration
     */
    AWSKinesisProvider.prototype.configure = function (config) {
        logger.debug('configure Analytics', config);
        var conf = config || {};
        this._config = Object.assign({}, this._config, conf);
        this._setupTimer();
        return this._config;
    };
    /**
     * record an event
     * @param {Object} params - the params of an event
     */
    AWSKinesisProvider.prototype.record = function (params) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._getCredentials()];
                    case 1:
                        credentials = _b.sent();
                        if (!credentials)
                            return [2 /*return*/, Promise.resolve(false)];
                        Object.assign(params, { config: this._config, credentials: credentials });
                        if ((_a = params.event) === null || _a === void 0 ? void 0 : _a.immediate) {
                            this._sendEvents([params]);
                            return [2 /*return*/, Promise.resolve(true)];
                        }
                        else {
                            return [2 /*return*/, this._putToBuffer(params)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AWSKinesisProvider.prototype.updateEndpoint = function () {
        logger.debug('updateEndpoint is not implemented in Kinesis provider');
        return Promise.resolve(true);
    };
    /**
     * @private
     * @param params - params for the event recording
     * Put events into buffer
     */
    AWSKinesisProvider.prototype._putToBuffer = function (params) {
        if (this._buffer.length < BUFFER_SIZE) {
            this._buffer.push(params);
            return Promise.resolve(true);
        }
        else {
            logger.debug('exceed analytics events buffer size');
            return Promise.reject(false);
        }
    };
    AWSKinesisProvider.prototype._sendFromBuffer = function (events) {
        var _this = this;
        // collapse events by credentials
        // events = [ {params} ]
        var eventsGroups = [];
        var preCred = null;
        var group = [];
        for (var i = 0; i < events.length; i += 1) {
            var cred = events[i].credentials;
            if (i === 0) {
                group.push(events[i]);
                preCred = cred;
            }
            else {
                if (cred.sessionToken === preCred.sessionToken &&
                    cred.identityId === preCred.identityId) {
                    logger.debug('no change for cred, put event in the same group');
                    group.push(events[i]);
                }
                else {
                    eventsGroups.push(group);
                    group = [];
                    group.push(events[i]);
                    preCred = cred;
                }
            }
        }
        eventsGroups.push(group);
        eventsGroups.map(function (evts) {
            _this._sendEvents(evts);
        });
    };
    AWSKinesisProvider.prototype._sendEvents = function (group) {
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
            // spit by streamName
            var evt = params.event;
            var streamName = evt.streamName;
            if (records[streamName] === undefined) {
                records[streamName] = [];
            }
            var bufferData = evt.data && typeof evt.data !== 'string'
                ? JSON.stringify(evt.data)
                : evt.data;
            var Data = fromUtf8(bufferData);
            var PartitionKey = evt.partitionKey || 'partition-' + credentials.identityId;
            var record = { Data: Data, PartitionKey: PartitionKey };
            records[streamName].push(record);
        });
        Object.keys(records).map(function (streamName) { return __awaiter(_this, void 0, void 0, function () {
            var command, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug('putting records to kinesis with records', records[streamName]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        command = new PutRecordsCommand({
                            Records: records[streamName],
                            StreamName: streamName,
                        });
                        return [4 /*yield*/, this._kinesis.send(command)];
                    case 2:
                        _a.sent();
                        logger.debug('Upload records to stream', streamName);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        logger.debug('Failed to upload records to Kinesis', err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    AWSKinesisProvider.prototype._init = function (config, credentials) {
        logger.debug('init clients');
        if (this._kinesis &&
            this._config.credentials &&
            this._config.credentials.sessionToken === credentials.sessionToken &&
            this._config.credentials.identityId === credentials.identityId) {
            logger.debug('no change for analytics config, directly return from init');
            return true;
        }
        this._config.credentials = credentials;
        var region = config.region, endpoint = config.endpoint;
        return this._initKinesis(region, endpoint, credentials);
    };
    AWSKinesisProvider.prototype._initKinesis = function (region, endpoint, credentials) {
        logger.debug('initialize kinesis with credentials', credentials);
        this._kinesis = new KinesisClient({
            region: region,
            credentials: credentials,
            customUserAgent: getAnalyticsUserAgent(AnalyticsAction.Record),
            endpoint: endpoint,
        });
        return true;
    };
    /**
     * @private
     * check if current credentials exists
     */
    AWSKinesisProvider.prototype._getCredentials = function () {
        var _this = this;
        return Credentials.get()
            .then(function (credentials) {
            if (!credentials)
                return null;
            logger.debug('set credentials for analytics', _this._config.credentials);
            return Credentials.shear(credentials);
        })
            .catch(function (err) {
            logger.debug('ensure credentials error', err);
            return null;
        });
    };
    return AWSKinesisProvider;
}());
export { AWSKinesisProvider };
//# sourceMappingURL=AWSKinesisProvider.js.map