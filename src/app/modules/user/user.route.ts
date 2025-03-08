import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "./user.constant";
import { UserControllers } from "./user.controller";
import { createCustomerValidationSchema, createMealProviderValidationSchema, loginValidationSchema } from "./user.validation";

const router = express.Router();

router.post("/create-mealProvider", validateRequest(createMealProviderValidationSchema), UserControllers.createMealProvider);

router.post("/create-customer", validateRequest(createCustomerValidationSchema), UserControllers.createCustomer);

router.post("/login", validateRequest(loginValidationSchema), UserControllers.login);

router.get("/my-profile", auth(USER_ROLE.customer, USER_ROLE.mealProvider), UserControllers.getMyProfile);

router.put("/my-profile-update", auth(USER_ROLE.customer, USER_ROLE.mealProvider), UserControllers.updateMyProfile);

export const UserRoutes = router;
