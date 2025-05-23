import { Router } from "express"
import { verifyUser } from "../middleware/verifyUser.js";
import { addWishList } from "../controllers/wishList/create.js";
import { validateId } from "../middleware/validateId.js";
import { readWishList } from "../controllers/wishList/read.js";
import { deleteWishList } from "../controllers/wishList/delete.js";


export const wishlistRoute = Router();

wishlistRoute.route('/wishlist').get(verifyUser, readWishList);

wishlistRoute.route('/wishlist/:id')
             .post(verifyUser, validateId, addWishList)
             .delete(verifyUser, validateId, deleteWishList);
