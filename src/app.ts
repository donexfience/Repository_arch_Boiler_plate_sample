import { ErrorMiddleware } from "./../../user-service/src/presentation/inversify-express-utils/Errors-middleware/error-middleware";
import express, { Application } from "express";
import { Database } from "./config/MongoDB/connection";
import { errorHandler } from "donexfdz";
import cartRoutes from "./router/cartRoutes";

class App {
  public app: Application;
  private port: number;
  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddleware();
    this.initializeServices();
  }
  private initializeMiddleware() {
    this.app.use(errorHandler);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/api", cartRoutes);
    // Error Handling Middleware
    this.app.use(ErrorMiddleware.handleError);
  }
  private async initializeServices() {
    //db connection
    await Database.connect();
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`CART-SERVICE RUNNING ON PORT ${this.port}`);
    });
  }
}
export default App;
