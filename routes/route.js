import { uesrRouter } from "./user.js";

export const routes = (server) => {
  const path = `/api/v1`;
  server.use(`${path}/auth`, uesrRouter);
};
