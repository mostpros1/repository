"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_ts_1 = require("bcrypt-ts");
var hash = (0, bcrypt_ts_1.hashSync)("bacon", 8);
console.log((0, bcrypt_ts_1.compareSync)("B4c0//", hash));
console.log((0, bcrypt_ts_1.compareSync)("not_bacon", hash));
