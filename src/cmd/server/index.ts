import { Hono } from "hono";

const newServer = (): Hono => {
  const app = new Hono();

  app.get("/", (c) => {
    return c.text("Hello Hono!");
  });

  return app;
};

export default newServer();
