"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLimitRateHit = void 0;
const validateLimitRateParams_1 = require("../validateLimitRateParams/validateLimitRateParams");
const getLeftTime = (id, throttle, localStorage) => {
    const lastTime = Number(localStorage.getItem(id) || 0);
    return throttle - Date.now() + lastTime;
};
const removeRecord = (id, leftTime, localStorage) => {
    setTimeout(() => {
        localStorage.removeItem(id);
    }, leftTime);
};
const isLimitRateHit = (localStorage, defaultID, options) => {
    if (!options.throttle) {
        return false;
    }
    (0, validateLimitRateParams_1.validateLimitRateParams)(options.throttle, options.id);
    const id = options.id || defaultID;
    const leftTime = getLeftTime(id, options.throttle, localStorage);
    if (leftTime > 0) {
        removeRecord(id, leftTime, localStorage);
        return true;
    }
    localStorage.setItem(id, Date.now().toString());
    removeRecord(id, options.throttle, localStorage);
    return false;
};
exports.isLimitRateHit = isLimitRateHit;
