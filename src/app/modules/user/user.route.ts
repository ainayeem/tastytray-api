import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { createCustomerValidationSchema, createMealProviderValidationSchema, loginValidationSchema } from "./user.validation";

const router = express.Router();

router.post("/create-mealProvider", validateRequest(createMealProviderValidationSchema), UserControllers.createMealProvider);

router.post("/create-customer", validateRequest(createCustomerValidationSchema), UserControllers.createCustomer);

router.post("/login", validateRequest(loginValidationSchema), UserControllers.login);

export const UserRoutes = router;
