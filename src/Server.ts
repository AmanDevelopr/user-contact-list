import * as express from "express";
import * as bodyParser from "body-parser";
import { errorHandler, notFoundRoute } from "./libs/routes";
import routes from "./route";
import * as cors from 'cors';
import * as morgan from "morgan";
import Database from "./libs/Database";
import Swagger from "./libs/Swagger";
import { SWAGGER_URL } from "./config/configuration";

export default class Server {
  app: express.Express;

  constructor(private config) {
    // this is a constructor
    this.app = express();
  }
  setupRoutes() {
    // to set up routes
    this.app.use(morgan("combined"));
    this.app.get("/health-check", (req, res, next) => {
      res.send("I am OK");
    });
    this.app.post("/POST", (req, res, next) => {
      console.log("post request called", req.body);
      res.send("I am Post");
    });
    this.app.use("/api", routes);
    this.app.use(notFoundRoute);
    this.app.use(errorHandler);
  }
  initBodyParser() {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }
  bootstrap() {
    // to bootstrap

    this.initBodyParser();
    this.initSwagger();
    this.setupRoutes();
    return this.app;
  }
  public async run() {
    const { port, env, mongoURI } = this.config;
    try {
      await Database.open(mongoURI);
      this.app.listen(port, () => {
        console.log(`App started successfully `);
      });
    } catch (error) {
      console.log("Error catched", error);
    }
    return this;
  }
  private initSwagger() {
    const { swaggerDefinition, swaggerUrl } = this.config;

    const swaggerSetup = new Swagger();

    this.app.use(
      `${swaggerUrl}.json`,
      swaggerSetup.getRouter({
        swaggerDefinition,
      })
    );

    const { serve, setup } = swaggerSetup.getUI(swaggerUrl);

    this.app.use(swaggerUrl, serve, setup);
  }
}