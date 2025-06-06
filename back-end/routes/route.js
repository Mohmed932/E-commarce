import { brandRoute } from "./brand.js";
import { cartRoute } from "./cart.js";
import { categoryRoute } from "./category.js";
import { filterRoute } from "./filter.js";
import { orderRoute } from "./order.js";
import { productRoute } from "./product.js";
import { RateProductRoute } from "./RateProduct.js";
import { subCategoryRoute } from "./subCategory.js";
import { uesrRouter } from "./user.js";
import { wishlistRoute } from "./wishlist.js";

export const routes = (server) => {
  const path = `/api/v1`;
  server.use(`${path}/auth`, uesrRouter);
  server.use(`${path}`, productRoute);
  server.use(`${path}`, RateProductRoute);
  server.use(`${path}`, categoryRoute);
  server.use(`${path}`, subCategoryRoute);
  server.use(`${path}`, brandRoute);
  server.use(`${path}`, cartRoute);
  server.use(`${path}`, orderRoute);
  server.use(`${path}`, filterRoute);
  server.use(`${path}`, wishlistRoute);
};
