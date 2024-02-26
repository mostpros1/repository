import { validateLimitRateParams } from '../validateLimitRateParams/validateLimitRateParams';
const getLeftTime = (id, throttle, localStorage) => {
    const lastTime = Number(localStorage.getItem(id) || 0);
    return throttle - Date.now() + lastTime;
};
const removeRecord = (id, leftTime, localStorage) => {
    setTimeout(() => {
        localStorage.removeItem(id);
    }, leftTime);
};
export const isLimitRateHit = (localStorage, defaultID, options) => {
    if (!options.throttle) {
        return false;
    }
    validateLimitRateParams(options.throttle, options.id);
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
