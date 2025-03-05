import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post("/create-order", auth(USER_ROLE.customer), OrderControllers.createOrder);

export const OrderRoutes = router;
