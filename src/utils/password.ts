import bcrypt from "bcrypt";
import {IPasswordService} from "../interfaces/utils/password";
import {injectable} from "inversify";

@injectable()
export class PasswordService implements IPasswordService {
    private SALT: number = 10;
    hashPassword (data: string): string {
        return bcrypt.hashSync(data, this.SALT);
    }

    comparePassword (passwordHash: string, password: string): boolean {
        return bcrypt.compareSync(password, passwordHash);
    }
}
