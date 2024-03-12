// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { Category, getAmplifyUserAgentObject, getAmplifyUserAgent, } from '@aws-amplify/core';
export function getAnalyticsUserAgent(action) {
    return getAmplifyUserAgentObject({
        category: Category.Analytics,
        action: action,
    });
}
export function getAnalyticsUserAgentString(action) {
    return getAmplifyUserAgent({
        category: Category.Analytics,
        action: action,
    });
}
//# sourceMappingURL=UserAgent.js.map