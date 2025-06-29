import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  AddSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryConroller,
} from "../controllers/subCategory.controller.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/create", auth, AddSubCategoryController);
subCategoryRouter.post("/get", getSubCategoryController);
subCategoryRouter.put("/update", auth, updateSubCategoryController);
subCategoryRouter.delete("/delete",auth, deleteSubCategoryConroller);

export default subCategoryRouter;
