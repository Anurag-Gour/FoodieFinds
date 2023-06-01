import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteproductController,
  filterProductController,
  getProductController,
  productCountController,
  productListController,
  productPhotoController,
  searchProductController,
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

//FILTER PRODUCT || METHOD POST
router.post("/filter-product", filterProductController);

//COUNT PRODUCT || METHOD GET
router.get("/product-count", productCountController);

//PRODUCT LIST PER PAGE || METHOD GET
router.get("/product-list/:page", productListController);

//SEARCH PRODUCT || METHOD GET
router.get("/search/:keyword", searchProductController);

//DELETE PRODUCT || METHOD DELETE
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteproductController
);

export default router;
