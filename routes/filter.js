import { Router } from "express";
import { searchProducts } from "../controllers/filter/search.js";
import { filterProducts } from "../controllers/filter/filter.js";



export const filterRoute = Router();

filterRoute.route("/products/search").get(searchProducts);
filterRoute.route("/products/filter").get(filterProducts)
