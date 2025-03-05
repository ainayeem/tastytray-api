import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { MealControllers } from "./meal.controller";
import { createMealValidationSchema, updateMealValidationSchema } from "./meal.validation";

const router = express.Router();

router.post("/menu", auth(USER_ROLE.mealProvider), validateRequest(createMealValidationSchema), MealControllers.createMeal);

router.get("/", MealControllers.getAllMeals);

router.get("/:id", MealControllers.getSingleMeal);

router.put("/:id", auth(USER_ROLE.mealProvider), validateRequest(updateMealValidationSchema), MealControllers.updateMeal);

router.delete("/:id", auth(USER_ROLE.mealProvider), MealControllers.deleteMeal);

export const MealRoutes = router;
