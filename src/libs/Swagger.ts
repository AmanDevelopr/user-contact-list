import { Router } from "express";
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUI from 'swagger-ui-express';

export interface ISwaggerDefinition {
  swaggerDefinition: {
    basePath: string;
    info: {
      description: string;
      title: string;
      version: string;
    };
  };
}

export default class Swagger {
  public getRouter({ swaggerDefinition }: ISwaggerDefinition) {
    const router = Router();
    router.route("/").get((req, res, next) => {
      // options for swagger docs
      const options = {
        apis: ["dist/**/*.js"],
        // import swagger definitions
        swaggerDefinition,
      };
      // initialize swagger-jsdoc
      const swaggerSpec = swaggerJSDoc(options);
      res.send(swaggerSpec);
    });
    return router;
  }
  public getUI(swaggerUrl: string) {
    const options = {
      swaggerUrl: `${swaggerUrl}.json`,
    };
    return {
      serve: swaggerUI.serve,
      setup: swaggerUI.setup(undefined, options),
    };
  }
}