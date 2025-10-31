import { Hono } from "hono";
import { createTranslator } from "@/internal/infrastructure/api/server/i18next";
import { AppContainer } from "@/internal/infrastructure/di/app";

const newApplication = async (): Promise<ExportedHandler> => {
  const translator = await createTranslator();

  const container = new AppContainer(translator);
  const serverApi = container.serverApi;
  const cron = container.cron;

  const app = new Hono();

  app.onError((error, c) => serverApi.errorHandler.error(error, c));

  app.get("/", (c) => {
    return c.text("Hello Hono!");
  });

  app.post("/api/v1/webhook/line", (c) => serverApi.lineWebhookHandler.post(c));

  return {
    fetch: (app satisfies Hono).fetch,
    scheduled: (controller, _env, ctx) =>
      cron.cronHandler.cron(controller, ctx),
  };
};

const application = await newApplication();

export default application;
