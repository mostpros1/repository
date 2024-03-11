// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __assign, __awaiter, __generator, __rest } from "tslib";
import { Cache } from '@aws-amplify/cache';
import { ConsoleLogger as Logger, ClientDevice, Credentials, Signer, Hub, transferKeyToLowerCase, transferKeyToUpperCase, AnalyticsAction, } from '@aws-amplify/core';
import { putEvents, updateEndpoint, } from '@aws-amplify/core/internals/aws-clients/pinpoint';
import { v1 as uuid } from 'uuid';
import { getAnalyticsUserAgentString } from '../utils/UserAgent';
import EventBuffer from './EventBuffer';
var AMPLIFY_SYMBOL = (typeof Symbol !== 'undefined' && typeof Symbol.for === 'function'
    ? Symbol.for('amplify_default')
    : '@@amplify_default');
var dispatchAnalyticsEvent = function (event, data) {
    Hub.dispatch('analytics', { event: event, data: data }, 'Analytics', AMPLIFY_SYMBOL);
};
var logger = new Logger('AWSPinpointProvider');
var RETRYABLE_CODES = [429, 500];
var ACCEPTED_CODES = [202];
var FORBIDDEN_CODE = 403;
var MOBILE_SERVICE_NAME = 'mobiletargeting';
var EXPIRED_TOKEN_CODE = 'ExpiredTokenException';
var UPDATE_ENDPOINT = '_update_endpoint';
var SESSION_START = '_session.start';
var SESSION_STOP = '_session.stop';
var BEACON_SUPPORTED = typeof navigator !== 'undefined' &&
    navigator &&
    typeof navigator.sendBeacon === 'function';
// events buffer
var BUFFER_SIZE = 1000;
var FLUSH_SIZE = 100;
var FLUSH_INTERVAL = 5 * 1000; // 5s
var RESEND_LIMIT = 5;
// params: { event: {name: , .... }, timeStamp, config, resendLimits }
var AWSPinpointProvider = /** @class */ (function () {
    function AWSPinpointProvider(config) {
        this._endpointGenerating = true;
        this._endpointUpdateInProgress = false;
        this._buffer = null;
        this._endpointBuffer = [];
        this._config = config ? config : {};
        this._config.bufferSize = this._config.bufferSize || BUFFER_SIZE;
        this._config.flushSize = this._config.flushSize || FLUSH_SIZE;
        this._config.flushInterval = this._config.flushInterval || FLUSH_INTERVAL;
        this._config.resendLimit = this._config.resendLimit || RESEND_LIMIT;
        this._clientInfo = ClientDevice.clientInfo();
    }
    /**
     * get the category of the plugin
     */
    AWSPinpointProvider.prototype.getCategory = function () {
        return AWSPinpointProvider.category;
    };
    /**
     * get provider name of the plugin
     */
    AWSPinpointProvider.prototype.getProviderName = function () {
        return AWSPinpointProvider.providerName;
    };
    /**
     * configure the plugin
     * @param {Object} config - configuration
     */
    AWSPinpointProvider.prototype.configure = function (config) {
        var _this = this;
        logger.debug('configure Analytics', config);
        var conf = config || {};
        this._config = Object.assign({}, this._config, conf);
        // If autoSessionRecord is enabled, we need to wait for the endpoint to be
        // updated before sending any events. See `sendEvents` in `Analytics.ts`
        this._endpointGenerating = !!config['autoSessionRecord'];
        if (this._config.appId && !this._config.disabled) {
            if (!this._config.endpointId) {
                var cacheKey = this.getProviderName() + '_' + this._config.appId;
                this._getEndpointId(cacheKey)
                    .then(function (endpointId) {
                    logger.debug('setting endpoint id from the cache', endpointId);
                    _this._config.endpointId = endpointId;
                    dispatchAnalyticsEvent('pinpointProvider_configured', null);
                })
                    .catch(function (err) {
                    logger.debug('Failed to generate endpointId', err);
                });
            }
            else {
                dispatchAnalyticsEvent('pinpointProvider_configured', null);
            }
        }
        else {
            this._flushBuffer();
        }
        return this._config;
    };
    /**
     * record an event
     * @param {Object} params - the params of an event
     */
    AWSPinpointProvider.prototype.record = function (params, handlers) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug('_public record', params);
                        return [4 /*yield*/, this._getCredentials()];
                    case 1:
                        credentials = _a.sent();
                        if (!credentials || !this._config.appId || !this._config.region) {
                            logger.debug('cannot send events without credentials, applicationId or region');
                            return [2 /*return*/, handlers.reject(new Error('No credentials, applicationId or region'))];
                        }
                        this._init(credentials);
                        timestamp = new Date().getTime();
                        // attach the session and eventId
                        this._generateSession(params);
                        params.event.eventId = uuid();
                        Object.assign(params, { timestamp: timestamp, config: this._config });
                        if (params.event.immediate) {
                            return [2 /*return*/, this._send(params, handlers)];
                        }
                        else {
                            this._putToBuffer(params, handlers);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AWSPinpointProvider.prototype._sendEndpointUpdate = function (endpointObject) {
        return __awaiter(this, void 0, void 0, function () {
            var next;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._endpointUpdateInProgress) {
                            this._endpointBuffer.push(endpointObject);
                            return [2 /*return*/];
                        }
                        this._endpointUpdateInProgress = true;
                        return [4 /*yield*/, this._updateEndpoint(endpointObject)];
                    case 1:
                        _a.sent();
                        next = this._endpointBuffer.shift();
                        this._endpointUpdateInProgress = false;
                        next && this._sendEndpointUpdate(next);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @param params - params for event recording
     * Put events into buffer
     */
    AWSPinpointProvider.prototype._putToBuffer = function (params, handlers) {
        var _a;
        if (params.event.name === UPDATE_ENDPOINT) {
            this._sendEndpointUpdate({ params: params, handlers: handlers });
            return;
        }
        (_a = this._buffer) === null || _a === void 0 ? void 0 : _a.push({ params: params, handlers: handlers });
    };
    AWSPinpointProvider.prototype._generateSession = function (params) {
        this._sessionId = this._sessionId || uuid();
        var event = params.event;
        switch (event.name) {
            case SESSION_START:
                // refresh the session id and session start time
                this._sessionStartTimestamp = new Date().getTime();
                this._sessionId = uuid();
                event.session = {
                    Id: this._sessionId,
                    StartTimestamp: new Date(this._sessionStartTimestamp).toISOString(),
                };
                break;
            case SESSION_STOP:
                var stopTimestamp = new Date().getTime();
                this._sessionStartTimestamp =
                    this._sessionStartTimestamp || new Date().getTime();
                this._sessionId = this._sessionId || uuid();
                event.session = {
                    Id: this._sessionId,
                    Duration: stopTimestamp - this._sessionStartTimestamp,
                    StartTimestamp: new Date(this._sessionStartTimestamp).toISOString(),
                    StopTimestamp: new Date(stopTimestamp).toISOString(),
                };
                this._sessionId = undefined;
                this._sessionStartTimestamp = undefined;
                break;
            default:
                this._sessionStartTimestamp =
                    this._sessionStartTimestamp || new Date().getTime();
                this._sessionId = this._sessionId || uuid();
                event.session = {
                    Id: this._sessionId,
                    StartTimestamp: new Date(this._sessionStartTimestamp).toISOString(),
                };
        }
    };
    AWSPinpointProvider.prototype._send = function (params, handlers) {
        return __awaiter(this, void 0, void 0, function () {
            var event;
            return __generator(this, function (_a) {
                event = params.event;
                switch (event.name) {
                    case UPDATE_ENDPOINT:
                        return [2 /*return*/, this._updateEndpoint({ params: params, handlers: handlers })];
                    case SESSION_STOP:
                        return [2 /*return*/, this._pinpointSendStopSession(params, handlers)];
                    default:
                        return [2 /*return*/, this._pinpointPutEvents(params, handlers)];
                }
                return [2 /*return*/];
            });
        });
    };
    AWSPinpointProvider.prototype._generateBatchItemContext = function (params) {
        var _a, _b;
        var event = params.event, timestamp = params.timestamp, config = params.config;
        var name = event.name, attributes = event.attributes, metrics = event.metrics, eventId = event.eventId, session = event.session;
        var appId = config.appId, endpointId = config.endpointId;
        var endpointContext = {};
        return {
            ApplicationId: appId,
            EventsRequest: {
                BatchItem: (_a = {},
                    _a[endpointId] = {
                        Endpoint: endpointContext,
                        Events: (_b = {},
                            _b[eventId] = {
                                EventType: name,
                                Timestamp: new Date(timestamp).toISOString(),
                                Attributes: attributes,
                                Metrics: metrics,
                                Session: session,
                            },
                            _b),
                    },
                    _a),
            },
        };
    };
    AWSPinpointProvider.prototype._pinpointPutEvents = function (params, handlers) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var eventId, endpointId, eventParams, _f, credentials, region, data, _g, StatusCode, Message, err_1;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        eventId = params.event.eventId, endpointId = params.config.endpointId;
                        eventParams = this._generateBatchItemContext(params);
                        _h.label = 1;
                    case 1:
                        _h.trys.push([1, 3, , 4]);
                        _f = this._config, credentials = _f.credentials, region = _f.region;
                        return [4 /*yield*/, putEvents({
                                credentials: credentials,
                                region: region,
                                userAgentValue: getAnalyticsUserAgentString(AnalyticsAction.Record),
                            }, eventParams)];
                    case 2:
                        data = _h.sent();
                        _g = (_e = (_d = (_c = (_b = (_a = data.EventsResponse) === null || _a === void 0 ? void 0 : _a.Results) === null || _b === void 0 ? void 0 : _b[endpointId]) === null || _c === void 0 ? void 0 : _c.EventsItemResponse) === null || _d === void 0 ? void 0 : _d[eventId]) !== null && _e !== void 0 ? _e : {}, StatusCode = _g.StatusCode, Message = _g.Message;
                        if (StatusCode && ACCEPTED_CODES.includes(StatusCode)) {
                            logger.debug('record event success. ', data);
                            return [2 /*return*/, handlers.resolve(data)];
                        }
                        else if (StatusCode && RETRYABLE_CODES.includes(StatusCode)) {
                            // TODO: v6 integrate retry to the service handler retryDecider
                            this._retry(params, handlers);
                        }
                        else {
                            logger.error("Event " + eventId + " is not accepted, the error is " + Message);
                            return [2 /*return*/, handlers.reject(data)];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _h.sent();
                        this._eventError(err_1);
                        return [2 /*return*/, handlers.reject(err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AWSPinpointProvider.prototype._pinpointSendStopSession = function (params, handlers) {
        if (!BEACON_SUPPORTED) {
            this._pinpointPutEvents(params, handlers);
            return;
        }
        var eventParams = this._generateBatchItemContext(params);
        var region = this._config.region;
        var ApplicationId = eventParams.ApplicationId, EventsRequest = eventParams.EventsRequest;
        var accessInfo = {
            secret_key: this._config.credentials.secretAccessKey,
            access_key: this._config.credentials.accessKeyId,
            session_token: this._config.credentials.sessionToken,
        };
        var url = "https://pinpoint." + region + ".amazonaws.com/v1/apps/" + ApplicationId + "/events/legacy";
        var body = JSON.stringify(EventsRequest);
        var method = 'POST';
        var request = {
            url: url,
            body: body,
            method: method,
        };
        var serviceInfo = { region: region, service: MOBILE_SERVICE_NAME };
        var requestUrl = Signer.signUrl(request, accessInfo, serviceInfo);
        var success = navigator.sendBeacon(requestUrl, body);
        if (success) {
            return handlers.resolve('sendBeacon success');
        }
        return handlers.reject('sendBeacon failure');
    };
    AWSPinpointProvider.prototype._retry = function (params, handlers) {
        var resendLimit = params.config.resendLimit;
        // For backward compatibility
        params.resendLimit =
            typeof params.resendLimit === 'number' ? params.resendLimit : resendLimit;
        if (params.resendLimit-- > 0) {
            logger.debug("resending event " + params.eventName + " with " + params.resendLimit + " retry times left");
            this._pinpointPutEvents(params, handlers);
        }
        else {
            logger.debug("retry times used up for event " + params.eventName);
        }
    };
    AWSPinpointProvider.prototype._updateEndpoint = function (endpointObject) {
        return __awaiter(this, void 0, void 0, function () {
            var params, handlers, config, event, appId, endpointId, request, update_params, _a, credentials, region, data, err_2, failureData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = endpointObject.params, handlers = endpointObject.handlers;
                        config = params.config, event = params.event;
                        appId = config.appId, endpointId = config.endpointId;
                        request = this._endpointRequest(config, transferKeyToLowerCase(event, [], ['attributes', 'userAttributes', 'Attributes', 'UserAttributes']));
                        update_params = {
                            ApplicationId: appId,
                            EndpointId: endpointId,
                            EndpointRequest: request,
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this._config, credentials = _a.credentials, region = _a.region;
                        return [4 /*yield*/, updateEndpoint({
                                credentials: credentials,
                                region: region,
                                userAgentValue: getAnalyticsUserAgentString(AnalyticsAction.UpdateEndpoint),
                            }, update_params)];
                    case 2:
                        data = _b.sent();
                        logger.debug('updateEndpoint success', data);
                        this._endpointGenerating = false;
                        this._resumeBuffer();
                        handlers.resolve(data);
                        return [2 /*return*/];
                    case 3:
                        err_2 = _b.sent();
                        failureData = {
                            err: err_2,
                            update_params: update_params,
                            endpointObject: endpointObject,
                        };
                        return [2 /*return*/, this._handleEndpointUpdateFailure(failureData)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AWSPinpointProvider.prototype._handleEndpointUpdateFailure = function (failureData) {
        return __awaiter(this, void 0, void 0, function () {
            var err, endpointObject, statusCode, exponential;
            return __generator(this, function (_a) {
                err = failureData.err, endpointObject = failureData.endpointObject;
                statusCode = err.$metadata && err.$metadata.httpStatusCode;
                logger.debug('updateEndpoint error', err);
                switch (statusCode) {
                    case FORBIDDEN_CODE:
                        return [2 /*return*/, this._handleEndpointUpdateForbidden(failureData)];
                    default:
                        if (RETRYABLE_CODES.includes(statusCode)) {
                            exponential = true;
                            return [2 /*return*/, this._retryEndpointUpdate(endpointObject, exponential)];
                        }
                        logger.error('updateEndpoint failed', err);
                        endpointObject.handlers.reject(err);
                }
                return [2 /*return*/];
            });
        });
    };
    AWSPinpointProvider.prototype._handleEndpointUpdateForbidden = function (failureData) {
        var err = failureData.err, endpointObject = failureData.endpointObject;
        var code = err.code, retryable = err.retryable;
        if (code !== EXPIRED_TOKEN_CODE && !retryable) {
            return endpointObject.handlers.reject(err);
        }
        this._retryEndpointUpdate(endpointObject);
    };
    AWSPinpointProvider.prototype._retryEndpointUpdate = function (endpointObject, exponential) {
        if (exponential === void 0) { exponential = false; }
        logger.debug('_retryEndpointUpdate', endpointObject);
        var params = endpointObject.params;
        // TODO: implement retry with exp back off once exp function is available
        var resendLimit = params.config.resendLimit;
        params.resendLimit =
            typeof params.resendLimit === 'number' ? params.resendLimit : resendLimit;
        if (params.resendLimit-- > 0) {
            logger.debug("resending endpoint update " + params.event.eventId + " with " + params.resendLimit + " retry attempts remaining");
            // insert at the front of endpointBuffer
            this._endpointBuffer.length
                ? this._endpointBuffer.unshift(endpointObject)
                : this._updateEndpoint(endpointObject);
            return;
        }
        logger.warn("resending endpoint update " + params.event.eventId + " failed after " + params.config.resendLimit + " attempts");
        if (this._endpointGenerating) {
            logger.error('Initial endpoint update failed. ');
        }
    };
    /**
     * @private
     * @param config
     * Configure credentials and init buffer
     */
    AWSPinpointProvider.prototype._init = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var identityId;
            return __generator(this, function (_a) {
                logger.debug('init provider');
                if (this._config.credentials &&
                    this._config.credentials.sessionToken === credentials.sessionToken &&
                    this._config.credentials.identityId === credentials.identityId) {
                    logger.debug('no change for aws credentials, directly return from init');
                    return [2 /*return*/];
                }
                identityId = this._config.credentials
                    ? this._config.credentials.identityId
                    : null;
                this._config.credentials = credentials;
                if (!this._bufferExists() || identityId !== credentials.identityId) {
                    // if the identity has changed, flush the buffer and instantiate a new one
                    // this will cause the old buffer to send any remaining events
                    // with the old credentials and then stop looping and shortly thereafter get picked up by GC
                    this._initBuffer();
                }
                return [2 /*return*/];
            });
        });
    };
    AWSPinpointProvider.prototype._bufferExists = function () {
        return this._buffer && this._buffer instanceof EventBuffer;
    };
    AWSPinpointProvider.prototype._initBuffer = function () {
        if (this._bufferExists()) {
            this._flushBuffer();
        }
        this._buffer = new EventBuffer(this._config);
        // if the first endpoint update hasn't yet resolved pause the buffer to
        // prevent race conditions. It will be resumed as soon as that request succeeds
        if (this._endpointGenerating) {
            this._buffer.pause();
        }
    };
    AWSPinpointProvider.prototype._flushBuffer = function () {
        var _a;
        if (this._bufferExists()) {
            (_a = this._buffer) === null || _a === void 0 ? void 0 : _a.flush();
            this._buffer = null;
        }
    };
    AWSPinpointProvider.prototype._resumeBuffer = function () {
        var _a;
        if (this._bufferExists()) {
            (_a = this._buffer) === null || _a === void 0 ? void 0 : _a.resume();
        }
    };
    AWSPinpointProvider.prototype._getEndpointId = function (cacheKey) {
        return __awaiter(this, void 0, void 0, function () {
            var endpointId, ttl, expiration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Cache.getItem(cacheKey)];
                    case 1:
                        endpointId = _a.sent();
                        logger.debug('endpointId from cache', endpointId, 'type', typeof endpointId);
                        if (!endpointId) {
                            endpointId = uuid();
                            ttl = 1000 * 60 * 60 * 24 * 365 * 100;
                            expiration = new Date().getTime() + ttl;
                            Cache.setItem(cacheKey, endpointId, {
                                expires: expiration,
                                priority: 1,
                            });
                        }
                        return [2 /*return*/, endpointId];
                }
            });
        });
    };
    /**
     * EndPoint request
     * @return {Object} - The request of updating endpoint
     */
    AWSPinpointProvider.prototype._endpointRequest = function (config, event) {
        var credentials = config.credentials;
        var clientInfo = this._clientInfo || {};
        var clientContext = config.clientContext || {};
        // for now we have three different ways for default endpoint configurations
        // clientInfo
        // clientContext (deprecated)
        // config.endpoint
        var defaultEndpointConfig = config.endpoint || {};
        var demographicByClientInfo = {
            appVersion: clientInfo.appVersion,
            make: clientInfo.make,
            model: clientInfo.model,
            modelVersion: clientInfo.version,
            platform: clientInfo.platform,
        };
        // for backward compatibility
        var clientId = clientContext.clientId, appTitle = clientContext.appTitle, appVersionName = clientContext.appVersionName, appVersionCode = clientContext.appVersionCode, appPackageName = clientContext.appPackageName, demographicByClientContext = __rest(clientContext, ["clientId", "appTitle", "appVersionName", "appVersionCode", "appPackageName"]);
        var channelType = event.address
            ? clientInfo.platform === 'android'
                ? 'GCM'
                : 'APNS'
            : undefined;
        var tmp = __assign(__assign(__assign({ channelType: channelType, requestId: uuid(), effectiveDate: new Date().toISOString() }, defaultEndpointConfig), event), { attributes: __assign(__assign({}, defaultEndpointConfig.attributes), event.attributes), demographic: __assign(__assign(__assign(__assign({}, demographicByClientInfo), demographicByClientContext), defaultEndpointConfig.demographic), event.demographic), location: __assign(__assign({}, defaultEndpointConfig.location), event.location), metrics: __assign(__assign({}, defaultEndpointConfig.metrics), event.metrics), user: {
                userId: event.userId ||
                    defaultEndpointConfig.userId ||
                    credentials.identityId,
                userAttributes: __assign(__assign({}, defaultEndpointConfig.userAttributes), event.userAttributes),
            } });
        // eliminate unnecessary params
        var userId = tmp.userId, userAttributes = tmp.userAttributes, name = tmp.name, session = tmp.session, eventId = tmp.eventId, immediate = tmp.immediate, ret = __rest(tmp, ["userId", "userAttributes", "name", "session", "eventId", "immediate"]);
        return transferKeyToUpperCase(ret, [], ['metrics', 'userAttributes', 'attributes']);
    };
    AWSPinpointProvider.prototype._eventError = function (err) {
        logger.error('record event failed.', err);
        logger.warn("Please ensure you have updated your Pinpoint IAM Policy " +
            "with the Action: \"mobiletargeting:PutEvents\" " +
            "in order to record events");
    };
    AWSPinpointProvider.prototype._getCredentials = function () {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Credentials.get()];
                    case 1:
                        credentials = _a.sent();
                        if (!credentials)
                            return [2 /*return*/, null];
                        logger.debug('set credentials for analytics', credentials);
                        return [2 /*return*/, Credentials.shear(credentials)];
                    case 2:
                        err_3 = _a.sent();
                        logger.debug('ensure credentials error', err_3);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AWSPinpointProvider.category = 'Analytics';
    AWSPinpointProvider.providerName = 'AWSPinpoint';
    return AWSPinpointProvider;
}());
export { AWSPinpointProvider };
//# sourceMappingURL=AWSPinpointProvider.js.map