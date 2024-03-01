import { genSalt, hash, compare } from "bcrypt-ts";

export async function hashPassword(password: string): Promise<string>{
    const salt = await genSalt(10);
    const hashedValue = await hash(password, salt);
    const hashedPassword = hashedValue;
    return hashedPassword;
}

export async function comparePassword(password: string, hashedValue: string): Promise<boolean> {
    return compare(password, hashedValue);
}