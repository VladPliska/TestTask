import { NextFunction, Request, Response } from "express";
import { validate } from 'class-validator';


export default function validation (ValidationSchema: any, payload: 'body' | 'query'){
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[payload];
    const object = new ValidationSchema(data);
    
    validate(object).then(err => {
      if(err.length > 0){
        return res.status(400).send({
          message: 'Validation failed',
          err
        });
      }else{
        return next();
      }
    });
  }
}