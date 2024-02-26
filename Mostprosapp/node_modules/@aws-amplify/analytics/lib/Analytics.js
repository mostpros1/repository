"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@aws-amplify/core");
var AWSPinpointProvider_1 = require("./Providers/AWSPinpointProvider");
var trackers_1 = require("./trackers");
var logger = new core_1.ConsoleLogger('AnalyticsClass');
var AMPLIFY_SYMBOL = (typeof Symbol !== 'undefined' && typeof Symbol.for === 'function'
    ? Symbol.for('amplify_default')
    : '@@amplify_default');
var dispatchAnalyticsEvent = function (event, data, message) {
    core_1.Hub.dispatch('analytics', { event: event, data: data, message: message }, 'Analytics', AMPLIFY_SYMBOL);
};
var trackers = {
    pageView: trackers_1.PageViewTracker,
    event: trackers_1.EventTracker,
    session: trackers_1.SessionTracker,
};
var _instance = null;
/**
 * Provide mobile analytics client functions
 */
var AnalyticsClass = /** @class */ (function () {
    /**
     * Initialize Analtyics
     * @param config - Configuration of the Analytics
     */
    function AnalyticsClass() {
        this._config = {};
        this._pluggables = [];
        this._disabled = false;
        this._trackers = {};
        _instance = this;
        this.record = this.record.bind(this);
        core_1.Hub.listen('auth', listener);
        core_1.Hub.listen('storage', listener);
        core_1.Hub.listen('analytics', listener);
        core_1.Hub.listen('core', listener);
    }
    AnalyticsClass.prototype.getModuleName = function () {
        return 'Analytics';
    };
    /**
     * configure Analytics
     * @param {Object} config - Configuration of the Analytics
     */
    AnalyticsClass.prototype.configure = function (config) {
        var _this = this;
        if (!config)
            return this._config;
        logger.debug('configure Analytics', config);
        var amplifyConfig = core_1.parseAWSExports(config);
        this._config = Object.assign({}, this._config, amplifyConfig.Analytics, config);
        if (this._config['disabled']) {
            this._disabled = true;
        }
        // turn on the autoSessionRecord if not specified
        if (this._config['autoSessionRecord'] === undefined) {
            this._config['autoSessionRecord'] = true;
        }
        this._pluggables.forEach(function (pluggable) {
            // for backward compatibility
            var providerConfig = pluggable.getProviderName() === 'AWSPinpoint' &&
                !_this._config['AWSPinpoint']
                ? _this._config
                : _this._config[pluggable.getProviderName()];
            pluggable.configure(tslib_1.__assign({ disabled: _this._config['disabled'], autoSessionRecord: _this._config['autoSessionRecord'] }, providerConfig));
        });
        if (this._pluggables.length === 0) {
            this.addPluggable(new AWSPinpointProvider_1.AWSPinpointProvider());
        }
        dispatchAnalyticsEvent('configured', null, "The Analytics category has been configured successfully");
        logger.debug('current configuration', this._config);
        return this._config;
    };
    /**
     * add plugin into Analytics category
     * @param pluggable - an instance of the plugin
     */
    AnalyticsClass.prototype.addPluggable = function (pluggable) {
        if (pluggable && pluggable.getCategory() === 'Analytics') {
            this._pluggables.push(pluggable);
            // for backward compatibility
            var providerConfig = pluggable.getProviderName() === 'AWSPinpoint' &&
                !this._config['AWSPinpoint']
                ? this._config
                : this._config[pluggable.getProviderName()];
            var config = tslib_1.__assign({ disabled: this._config['disabled'] }, providerConfig);
            pluggable.configure(config);
            return config;
        }
    };
    /**
     * Get the plugin object
     * @param providerName - the name of the provider to be removed
     */
    AnalyticsClass.prototype.getPluggable = function (providerName) {
        for (var i = 0; i < this._pluggables.length; i += 1) {
            var pluggable = this._pluggables[i];
            if (pluggable.getProviderName() === providerName) {
                return pluggable;
            }
        }
        logger.debug('No plugin found with providerName', providerName);
        return null;
    };
    /**
     * Remove the plugin object
     * @param providerName - the name of the provider to be removed
     */
    AnalyticsClass.prototype.removePluggable = function (providerName) {
        var idx = 0;
        while (idx < this._pluggables.length) {
            if (this._pluggables[idx].getProviderName() === providerName) {
                break;
            }
            idx += 1;
        }
        if (idx === this._pluggables.length) {
            logger.debug('No plugin found with providerName', providerName);
            return;
        }
        else {
            this._pluggables.splice(idx, idx + 1);
            return;
        }
    };
    /**
     * stop sending events
     */
    AnalyticsClass.prototype.disable = function () {
        this._disabled = true;
    };
    /**
     * start sending events
     */
    AnalyticsClass.prototype.enable = function () {
        this._disabled = false;
    };
    /**
     * Record Session start
     * @param [provider] - name of the provider.
     * @return - A promise which resolves if buffer doesn't overflow
     */
    AnalyticsClass.prototype.startSession = function (provider) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var event, params;
            return tslib_1.__generator(this, function (_a) {
                event = { name: '_session.start' };
                params = { event: event, provider: provider };
                dispatchAnalyticsEvent('record', event, 'Recording Analytics session start event');
                return [2 /*return*/, this._sendEvent(params)];
            });
        });
    };
    /**
     * Record Session stop
     * @param [provider] - name of the provider.
     * @return - A promise which resolves if buffer doesn't overflow
     */
    AnalyticsClass.prototype.stopSession = function (provider) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var event, params;
            return tslib_1.__generator(this, function (_a) {
                event = { name: '_session.stop' };
                params = { event: event, provider: provider };
                dispatchAnalyticsEvent('record', event, 'Recording Analytics session stop event');
                return [2 /*return*/, this._sendEvent(params)];
            });
        });
    };
    /**
     * Record one analytic event and send it to Pinpoint
     * @param event - An object with the name of the event, attributes of the event and event metrics.
     * @param [provider] - name of the provider.
     */
    AnalyticsClass.prototype.record = function (event, provider) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var params;
            return tslib_1.__generator(this, function (_a) {
                params = { event: event, provider: provider };
                dispatchAnalyticsEvent('record', params.event, 'Recording Analytics event');
                return [2 /*return*/, this._sendEvent(params)];
            });
        });
    };
    AnalyticsClass.prototype.updateEndpoint = function (attrs, provider) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var event;
            return tslib_1.__generator(this, function (_a) {
                event = tslib_1.__assign(tslib_1.__assign({}, attrs), { name: '_update_endpoint' });
                return [2 /*return*/, this.record(event, provider)];
            });
        });
    };
    AnalyticsClass.prototype._sendEvent = function (params) {
        var _this = this;
        if (this._disabled) {
            logger.debug('Analytics has been disabled');
            return Promise.resolve();
        }
        var provider = params.provider ? params.provider : 'AWSPinpoint';
        return new Promise(function (resolve, reject) {
            _this._pluggables.forEach(function (pluggable) {
                if (pluggable.getProviderName() === provider) {
                    pluggable.record(params, { resolve: resolve, reject: reject });
                }
            });
        });
    };
    AnalyticsClass.prototype.autoTrack = function (trackerType, opts) {
        if (!trackers[trackerType]) {
            logger.debug('invalid tracker type');
            return;
        }
        // to sync up two different configuration ways of auto session tracking
        if (trackerType === 'session') {
            this._config['autoSessionRecord'] = opts['enable'];
        }
        var tracker = this._trackers[trackerType];
        if (!tracker) {
            this._trackers[trackerType] = new trackers[trackerType](this.record, opts);
        }
        else {
            tracker.configure(opts);
        }
    };
    return AnalyticsClass;
}());
exports.AnalyticsClass = AnalyticsClass;
var endpointUpdated = false;
var authConfigured = false;
var analyticsConfigured = false;
var credentialsConfigured = false;
var listener = function (capsule) {
    var channel = capsule.channel, payload = capsule.payload;
    logger.debug('on hub capsule ' + channel, payload);
    switch (channel) {
        case 'auth':
            authEvent(payload);
            break;
        case 'storage':
            storageEvent(payload);
            break;
        case 'analytics':
            analyticsEvent(payload);
            break;
        case 'core':
            coreEvent(payload);
            break;
        default:
            break;
    }
};
var storageEvent = function (payload) {
    var _a = payload.data, attrs = _a.attrs, metrics = _a.metrics;
    if (!attrs)
        return;
    if (analyticsConfigured) {
        _instance
            .record({
            name: 'Storage',
            attributes: attrs,
            metrics: metrics,
        })
            .catch(function (e) {
            logger.debug('Failed to send the storage event automatically', e);
        });
    }
};
var authEvent = function (payload) {
    var event = payload.event;
    if (!event) {
        return;
    }
    var recordAuthEvent = function (eventName) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(authConfigured && analyticsConfigured)) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, _instance.record({ name: "_userauth." + eventName })];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_1 = _a.sent();
                    logger.debug("Failed to send the " + eventName + " event automatically", err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    switch (event) {
        case 'signIn':
            return recordAuthEvent('sign_in');
        case 'signUp':
            return recordAuthEvent('sign_up');
        case 'signOut':
            return recordAuthEvent('sign_out');
        case 'signIn_failure':
            return recordAuthEvent('auth_fail');
        case 'configured':
            authConfigured = true;
            if (analyticsConfigured) {
                sendEvents();
            }
            break;
    }
};
var analyticsEvent = function (payload) {
    var event = payload.event;
    if (!event)
        return;
    switch (event) {
        case 'pinpointProvider_configured':
            analyticsConfigured = true;
            if (authConfigured || credentialsConfigured) {
                sendEvents();
            }
            break;
    }
};
var coreEvent = function (payload) {
    var event = payload.event;
    if (!event)
        return;
    switch (event) {
        case 'credentials_configured':
            credentialsConfigured = true;
            if (analyticsConfigured) {
                sendEvents();
            }
            break;
    }
};
var sendEvents = function () {
    var config = _instance.configure();
    if (!endpointUpdated && config['autoSessionRecord']) {
        _instance.updateEndpoint({ immediate: true }).catch(function (e) {
            logger.debug('Failed to update the endpoint', e);
        });
        endpointUpdated = true;
    }
    _instance.autoTrack('session', {
        enable: config['autoSessionRecord'],
    });
};
exports.Analytics = new AnalyticsClass();
core_1.Amplify.register(exports.Analytics);
//# sourceMappingURL=Analytics.js.map