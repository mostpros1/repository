// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var anyGlobal = global;
anyGlobal.navigator = anyGlobal.navigator || {};
// @ts-ignore
anyGlobal.navigator.sendBeacon = anyGlobal.navigator.sendBeacon || jest.fn();
//# sourceMappingURL=setupTests.js.map