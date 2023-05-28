import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteproductController,
  getProductController,
  productPhotoController,
  singleProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
//router object
const router = express.Router();

//routing
//CREATE PRODUCT || METHOD POST
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//UPDATE PRODUCT || METHOD PUT
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//GET PRODUCTS || METHOD GET
router.get("/get-product", getProductController);

//GET SINGLE PRODUCT || METHOD GET
router.get("/single-product/:slug", singleProductController);

//GET PHOTO || METHOD GET
router.get("/product-photo/:pid", productPhotoController);

//DELETE PRODUCT || METHOD DELETE
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteproductController
);

export default router;
