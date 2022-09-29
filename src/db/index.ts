import { injectable } from "inversify";
import mongoose from "mongoose";
import IDB from "../interfaces/db";

@injectable()
export default class DB implements IDB{
  constructor() {}

  async connect(): Promise<void> {
    try{
      await mongoose.connect(process.env.DB_URL as string);

      console.log('Connection successfully.');
    }catch(err: any){
      console.log('Connection error', err.message);
      process.exit(1);
    }
  }
}
