// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __awaiter, __generator } from "tslib";
import { MethodEmbed } from '../utils/MethodEmbed';
import { ConsoleLogger as Logger, browserOrNode } from '@aws-amplify/core';
var logger = new Logger('PageViewTracker');
var PREV_URL_KEY = 'aws-amplify-analytics-prevUrl';
var getUrl = function () {
    if (!browserOrNode().isBrowser)
        return '';
    else
        return window.location.origin + window.location.pathname;
};
var defaultOpts = {
    enable: false,
    provider: 'AWSPinpoint',
    getUrl: getUrl,
};
var PageViewTracker = /** @class */ (function () {
    function PageViewTracker(tracker, opts) {
        logger.debug('initialize pageview tracker with opts', opts);
        this._config = Object.assign({}, defaultOpts, opts);
        this._tracker = tracker;
        this._hasEnabled = false;
        this._trackFunc = this._trackFunc.bind(this);
        if (this._config.type === 'SPA') {
            this._pageViewTrackSPA();
        }
        else {
            this._pageViewTrackDefault();
        }
    }
    PageViewTracker.prototype.configure = function (opts) {
        Object.assign(this._config, opts);
        // if spa, need to remove those listeners if disabled
        if (this._config.type === 'SPA') {
            this._pageViewTrackSPA();
        }
        return this._config;
    };
    PageViewTracker.prototype._isSameUrl = function () {
        var prevUrl = sessionStorage.getItem(PREV_URL_KEY);
        var curUrl = this._config.getUrl();
        if (prevUrl === curUrl) {
            logger.debug('the url is same');
            return true;
        }
        else
            return false;
    };
    PageViewTracker.prototype._pageViewTrackDefault = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, customAttrs, _a, attributes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!browserOrNode().isBrowser ||
                            !window.addEventListener ||
                            !window.sessionStorage) {
                            logger.debug('not in the supported web enviroment');
                            return [2 /*return*/];
                        }
                        url = this._config.getUrl();
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
                        attributes = Object.assign({
                            url: url,
                        }, customAttrs);
                        if (this._config.enable && !this._isSameUrl()) {
                            this._tracker({
                                name: this._config.eventName || 'pageView',
                                attributes: attributes,
                            }, this._config.provider).catch(function (e) {
                                logger.debug('Failed to record the page view event', e);
                            });
                            sessionStorage.setItem(PREV_URL_KEY, url);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PageViewTracker.prototype._trackFunc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, customAttrs, _a, attributes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!browserOrNode().isBrowser ||
                            !window.addEventListener ||
                            !history.pushState ||
                            !window.sessionStorage) {
                            logger.debug('not in the supported web enviroment');
                            return [2 /*return*/];
                        }
                        url = this._config.getUrl();
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
                        attributes = Object.assign({
                            url: url,
                        }, customAttrs);
                        if (!this._isSameUrl()) {
                            this._tracker({
                                name: this._config.eventName || 'pageView',
                                attributes: attributes,
                            }, this._config.provider).catch(function (e) {
                                logger.debug('Failed to record the page view event', e);
                            });
                            sessionStorage.setItem(PREV_URL_KEY, url);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PageViewTracker.prototype._pageViewTrackSPA = function () {
        if (!browserOrNode().isBrowser ||
            !window.addEventListener ||
            !history.pushState) {
            logger.debug('not in the supported web enviroment');
            return;
        }
        if (this._config.enable && !this._hasEnabled) {
            MethodEmbed.add(history, 'pushState', this._trackFunc);
            MethodEmbed.add(history, 'replaceState', this._trackFunc);
            window.addEventListener('popstate', this._trackFunc);
            this._trackFunc();
            this._hasEnabled = true;
        }
        else {
            MethodEmbed.remove(history, 'pushState');
            MethodEmbed.remove(history, 'replaceState');
            window.removeEventListener('popstate', this._trackFunc);
            this._hasEnabled = false;
        }
    };
    return PageViewTracker;
}());
export { PageViewTracker };
//# sourceMappingURL=PageViewTracker.js.map