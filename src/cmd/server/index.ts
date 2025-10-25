import { AppContainer } from "@/internal/infrastructure/di/app";
import { Hono } from "hono";

const newServer = () => {
  const app = new Hono();

  app.get("/", (c) => {
    return c.text("Hello Hono!");
  });

  const container = new AppContainer();
  const serverApi = container.serverApi;

  app.post("/api/v1/webhook/line", (c) => serverApi.lineWebhookHandler.post(c));

  return app satisfies Hono;
};

export default newServer();
