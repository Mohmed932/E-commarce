import { categoryRoute } from "./category.js";
import { subCategoryRoute } from "./subCategory.js";
import { uesrRouter } from "./user.js";

export const routes = (server) => {
  const path = `/api/v1`;
  server.use(`${path}/auth`, uesrRouter);
  server.use(`${path}`, categoryRoute);
  server.use(`${path}`, subCategoryRoute);
};
