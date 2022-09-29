import {IIdService} from "../interfaces/utils/idService";
import {injectable} from "inversify";
import { ObjectId } from 'mongodb';

@injectable()
export class IdService implements IIdService {
    isValid(id: string): boolean {
        return ObjectId.isValid(id);
    }

    generateId(): any {
        return new ObjectId();
    }

}