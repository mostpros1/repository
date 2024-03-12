"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dom_utils_1 = require("../vendor/dom-utils");
var core_1 = require("@aws-amplify/core");
var logger = new core_1.ConsoleLogger('EventTracker');
var defaultOpts = {
    enable: false,
    events: ['click'],
    selectorPrefix: 'data-amplify-analytics-',
    provider: 'AWSPinpoint',
};
var EventTracker = /** @class */ (function () {
    function EventTracker(tracker, opts) {
        if (!core_1.browserOrNode().isBrowser || !window.addEventListener) {
            logger.debug('not in the supported web environment');
            return;
        }
        this._config = Object.assign({}, defaultOpts, opts);
        this._tracker = tracker;
        this._delegates = {};
        this._trackFunc = this._trackFunc.bind(this);
        logger.debug('initialize pageview tracker with opts', this._config);
        this.configure(this._config);
    }
    EventTracker.prototype.configure = function (opts) {
        var _this = this;
        Object.assign(this._config, opts);
        if (!this._config.enable) {
            Object.keys(this._delegates).forEach(function (key) {
                if (typeof _this._delegates[key].destroy === 'function')
                    _this._delegates[key].destroy();
            });
            this._delegates = {};
        }
        else if (this._config.enable &&
            Object.keys(this._delegates).length === 0) {
            var selector_1 = '[' + this._config.selectorPrefix + 'on]';
            this._config.events.forEach(function (evt) {
                _this._delegates[evt] = dom_utils_1.delegate(document, evt, selector_1, _this._trackFunc, { composed: true, useCapture: true });
            });
        }
        return this._config;
    };
    EventTracker.prototype._trackFunc = function (event, element) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var customAttrs, events, eventName, attrs, defaultAttrs, _a, attributes;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        customAttrs = {};
                        events = element
                            .getAttribute(this._config.selectorPrefix + 'on')
                            .split(/\s*,\s*/);
                        eventName = element.getAttribute(this._config.selectorPrefix + 'name');
                        attrs = element.getAttribute(this._config.selectorPrefix + 'attrs');
                        if (attrs) {
                            attrs.split(/\s*,\s*/).forEach(function (attr) {
                                var tmp = attr.trim().split(/\s*:\s*/);
                                customAttrs[tmp[0]] = tmp[1];
                            });
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
                        defaultAttrs = _a;
                        attributes = Object.assign({
                            type: event.type,
                            target: event.target.localName + " with id " + event.target.id,
                        }, defaultAttrs, customAttrs);
                        logger.debug('events needed to be recorded', events);
                        logger.debug('attributes needed to be attached', customAttrs);
                        if (events.indexOf(event.type) < 0) {
                            logger.debug("event " + event.type + " is not selected to be recorded");
                            return [2 /*return*/];
                        }
                        this._tracker({
                            name: eventName || 'event',
                            attributes: attributes,
                        }, this._config.provider).catch(function (e) {
                            logger.debug("Failed to record the " + event.type + " event', " + e);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return EventTracker;
}());
exports.EventTracker = EventTracker;
//# sourceMappingURL=EventTracker.js.map