import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { MealControllers } from "./meal.controller";
import { createMealValidationSchema } from "./meal.validation";

const router = express.Router();

router.post("/create-meal", auth(USER_ROLE.mealProvider), validateRequest(createMealValidationSchema), MealControllers.createMeal);

router.get("/", MealControllers.getAllMeals);

// router.get("/:id", ProductControllers.getSingleProduct);

// router.patch("/:id", validateRequest(productValidations.updateProductValidationSchema), ProductControllers.updateProduct);

// router.delete("/:id", ProductControllers.deleteProduct);

export const MealRoutes = router;
