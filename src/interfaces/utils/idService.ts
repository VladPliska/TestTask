export interface IIdService {
    generateId(): any;

    isValid(id: string): boolean;
}
