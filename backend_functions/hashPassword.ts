import { genSalt, hash, compare } from "bcrypt-ts";

export function hashPassword(password: string) {
    genSalt(10).then((salt) => hash(password, salt))
        .then((hashedValue) => {
            return hashedValue;
        });
}

export function comparePassword(password: string, hashedValue: string) {
    compare(password, hashedValue).then((result) => {
        return result;
    });

}