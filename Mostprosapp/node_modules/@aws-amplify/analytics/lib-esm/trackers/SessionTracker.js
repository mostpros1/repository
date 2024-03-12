// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __awaiter, __generator } from "tslib";
// the session tracker for web
import { ConsoleLogger as Logger, browserOrNode, } from '@aws-amplify/core';
var logger = new Logger('SessionTracker');
var defaultOpts = {
    enable: false,
    provider: 'AWSPinpoint',
};
var initialEventSent = false;
var SessionTracker = /** @class */ (function () {
    function SessionTracker(tracker, opts) {
        this._config = Object.assign({}, defaultOpts, opts);
        this._tracker = tracker;
        this._hasEnabled = false;
        this._trackFunc = this._trackFunc.bind(this);
        this._trackBeforeUnload = this._trackBeforeUnload.bind(this);
        this.configure(this._config);
    }
    SessionTracker.prototype._envCheck = function () {
        if (!browserOrNode().isBrowser) {
            return false;
        }
        if (!document || !document.addEventListener) {
            logger.debug('not in the supported web environment');
            return false;
        }
        if (typeof document.hidden !== 'undefined') {
            this._hidden = 'hidden';
            this._visibilityChange = 'visibilitychange';
        }
        else if (typeof document['msHidden'] !== 'undefined') {
            this._hidden = 'msHidden';
            this._visibilityChange = 'msvisibilitychange';
        }
        else if (typeof document['webkitHidden'] !== 'undefined') {
            this._hidden = 'webkitHidden';
            this._visibilityChange = 'webkitvisibilitychange';
        }
        else {
            logger.debug('not in the supported web environment');
            return false;
        }
        return true;
    };
    SessionTracker.prototype._trackFunc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var customAttrs, _a, attributes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof this._config.attributes === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._config.attributes()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = this._config.attributes;
                        _b.label = 3;
                    case 3:
                        customAttrs = _a;
                        attributes = Object.assign({}, customAttrs);
                        if (document.visibilityState === this._hidden) {
                            this._tracker({
                                name: '_session.stop',
                                attributes: attributes,
                            }, this._config.provider).catch(function (e) {
                                logger.debug('record session stop event failed.', e);
                            });
                        }
                        else {
                            this._tracker({
                                name: '_session.start',
                                attributes: attributes,
                            }, this._config.provider).catch(function (e) {
                                logger.debug('record session start event failed.', e);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionTracker.prototype._trackBeforeUnload = function (event) {
        // before unload callback cannot be async => https://github.com/aws-amplify/amplify-js/issues/2088
        var _this = this;
        var customAttrs = typeof this._config.attributes === 'function'
            ? Promise.resolve(this._config.attributes())
            : Promise.resolve(this._config.attributes);
        customAttrs.then(function (custom) {
            var attributes = Object.assign({}, custom);
            _this._tracker({
                name: '_session.stop',
                attributes: attributes,
                immediate: true,
            }, _this._config.provider).catch(function (e) {
                logger.debug('record session stop event failed.', e);
            });
        });
    };
    // to keep configure a synchronized function
    SessionTracker.prototype._sendInitialEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var customAttrs, _a, attributes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (initialEventSent) {
                            logger.debug('the start session has been sent when the page is loaded');
                            return [2 /*return*/];
                        }
                        else {
                            initialEventSent = true;
                        }
                        if (!(typeof this._config.attributes === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._config.attributes()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = this._config.attributes;
                        _b.label = 3;
                    case 3:
                        customAttrs = _a;
                        attributes = Object.assign({}, customAttrs);
                        this._tracker({
                            name: '_session.start',
                            attributes: attributes,
                        }, this._config.provider).catch(function (e) {
                            logger.debug('record session start event failed.', e);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionTracker.prototype.configure = function (opts) {
        if (!this._envCheck()) {
            return this._config;
        }
        Object.assign(this._config, opts);
        if (this._config.enable && !this._hasEnabled) {
            // send a start session as soon as it's enabled
            this._sendInitialEvent();
            // listen on events
            document.addEventListener(this._visibilityChange, this._trackFunc, false);
            window.addEventListener('beforeunload', this._trackBeforeUnload, false);
            this._hasEnabled = true;
        }
        else if (!this._config.enable && this._hasEnabled) {
            document.removeEventListener(this._visibilityChange, this._trackFunc, false);
            window.removeEventListener('beforeunload', this._trackBeforeUnload, false);
            this._hasEnabled = false;
        }
        return this._config;
    };
    return SessionTracker;
}());
export { SessionTracker };
//# sourceMappingURL=SessionTracker.js.map