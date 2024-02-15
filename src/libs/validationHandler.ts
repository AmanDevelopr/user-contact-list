import { Request, Response, NextFunction } from 'express';

// tslint:disable-next-line: no-var-requires
import { checkSchema, validationResult } from 'express-validator';

const validationHandler = (validator: any) => {
  return [
    checkSchema(validator),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        next({ message: 'Bad Request', status: 422, error: errors.array() });
      }
      next();
    },
  ];
};

export default validationHandler;
