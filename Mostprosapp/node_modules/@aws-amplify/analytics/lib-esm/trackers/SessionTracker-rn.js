// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __awaiter, __generator } from "tslib";
// the session tracker for react native
import { ConsoleLogger as Logger } from '@aws-amplify/core';
import { AppState } from 'react-native';
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
        this._currentState = AppState.currentState;
        this.configure(this._config);
    }
    SessionTracker.prototype._envCheck = function () {
        if (!AppState) {
            logger.debug('not in the supported react native environment');
            return false;
        }
        return true;
    };
    SessionTracker.prototype._trackFunc = function (nextAppState) {
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
                        if (this._currentState.match(/inactive|background/) &&
                            nextAppState === 'active') {
                            logger.debug('App has come to the foreground, recording start session');
                            this._tracker({
                                name: '_session.start',
                                attributes: attributes,
                                immediate: false,
                            }, this._config.provider).catch(function (e) {
                                logger.debug('record session start event failed.', e);
                            });
                        }
                        if (this._currentState.match(/active/) &&
                            nextAppState.match(/inactive|background/)) {
                            logger.debug('App has come to inactive/background, recording stop session');
                            this._tracker({
                                name: '_session.stop',
                                attributes: attributes,
                                immediate: false,
                            }, this._config.provider).catch(function (e) {
                                logger.debug('record session stop event failed.', e);
                            });
                        }
                        this._currentState = nextAppState;
                        return [2 /*return*/];
                }
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
                            immediate: false,
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
            AppState.addEventListener('change', this._trackFunc, false);
            this._hasEnabled = true;
        }
        else if (!this._config.enable && this._hasEnabled) {
            AppState.removeEventListener('change', this._trackFunc, false);
            this._hasEnabled = false;
        }
        return this._config;
    };
    return SessionTracker;
}());
export { SessionTracker };
//# sourceMappingURL=SessionTracker-rn.js.map