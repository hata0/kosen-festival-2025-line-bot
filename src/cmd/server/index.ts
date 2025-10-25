import { Hono } from "hono";
import { createTranslator } from "@/internal/infrastructure/api/server/i18next";
import { AppContainer } from "@/internal/infrastructure/di/app";

const newApplication = async () => {
  const app = new Hono();

  app.get("/", (c) => {
    return c.text("Hello Hono!");
  });

  const translator = await createTranslator();

  const container = new AppContainer(translator);
  const serverApi = container.serverApi;

  app.post("/api/v1/webhook/line", (c) => serverApi.lineWebhookHandler.post(c));

  return app satisfies Hono;
};

const application = await newApplication();

export default application;
