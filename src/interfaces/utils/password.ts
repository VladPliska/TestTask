export interface IPasswordService {
    hashPassword(pwd: string): string
    comparePassword(hash: string, pwd: string): boolean
}