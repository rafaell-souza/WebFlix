import bcrypt from "bcrypt";

export default class Bcrypt {
    static async hash(password: string) {
        return await bcrypt.hash(password, 10);
    }

    static async compare(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }
}