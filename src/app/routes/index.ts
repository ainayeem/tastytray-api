import { Router } from "express";
import { MealRoutes } from "../modules/meal/meal.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/providers",
    route: MealRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
