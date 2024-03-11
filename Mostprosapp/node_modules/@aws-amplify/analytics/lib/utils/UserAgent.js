"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var core_1 = require("@aws-amplify/core");
function getAnalyticsUserAgent(action) {
    return core_1.getAmplifyUserAgentObject({
        category: core_1.Category.Analytics,
        action: action,
    });
}
exports.getAnalyticsUserAgent = getAnalyticsUserAgent;
function getAnalyticsUserAgentString(action) {
    return core_1.getAmplifyUserAgent({
        category: core_1.Category.Analytics,
        action: action,
    });
}
exports.getAnalyticsUserAgentString = getAnalyticsUserAgentString;
//# sourceMappingURL=UserAgent.js.map