"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var lists = [];
var MethodEmbed = /** @class */ (function () {
    function MethodEmbed(context, methodName) {
        this.context = context;
        this.methodName = methodName;
        this._originalMethod = context[methodName].bind(context);
    }
    MethodEmbed.add = function (context, methodName, methodOverride) {
        getInstance(context, methodName).set(methodOverride);
    };
    MethodEmbed.remove = function (context, methodName) {
        getInstance(context, methodName).remove();
    };
    MethodEmbed.prototype.set = function (methodOverride) {
        var _this = this;
        this.context[this.methodName] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return methodOverride(_this._originalMethod.apply(_this, tslib_1.__spread(args)));
        };
    };
    MethodEmbed.prototype.remove = function () {
        this.context[this.methodName] = this._originalMethod;
    };
    return MethodEmbed;
}());
exports.MethodEmbed = MethodEmbed;
function getInstance(context, methodName) {
    var instance = lists.filter(function (h) { return h.context === context && h.methodName === methodName; })[0];
    if (!instance) {
        instance = new MethodEmbed(context, methodName);
        lists.push(instance);
    }
    return instance;
}
//# sourceMappingURL=MethodEmbed.js.map