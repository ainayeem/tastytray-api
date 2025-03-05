import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { Meal } from "../meal/meal.model";
import { User } from "../user/user.model";
import { Order } from "./order.model";

// const createOrderInDB = async (user: JwtPayload, payload: { meals: { meal: string; quantity: number }[]; customizations?: string[] }) => {
//   const dbUser = await User.findById(user._id);

//   if (!payload?.meals?.length) {
//     throw new AppError(StatusCodes.NOT_ACCEPTABLE, "Meals are required");
//   }

//   let totalPrice = 0;
//   // get all meal IDs
//   const mealIds = payload.meals.map((m) => m.meal);

//   //get each product
//   const dbMeals = await Meal.find({ _id: { $in: mealIds } });

//   // Map products key value
//   const mealMap = new Map(dbMeals.map((m) => [m._id.toString(), m]));

//   //   check availibility of each product
//   for (const { meal, quantity } of payload.meals) {
//     const dbMeal = mealMap.get(meal);
//     if (!dbMeal) {
//       throw new AppError(StatusCodes.NOT_FOUND, ` Meal with id ${meal} not found`);
//     }
//     if (!dbMeal.availability) {
//       throw new AppError(StatusCodes.NOT_ACCEPTABLE, ` Meal with id ${meal} is not available`);
//     }
//   }

//   //order placement
//   const orderedMeals = payload.meals.map(({ meal, quantity }) => {
//     const dbMeal = mealMap.get(meal)!;
//     totalPrice += dbMeal.price * quantity;
//     return { meal: dbMeal._id, quantity };
//   });

//   const order = await Order.create({
//     user: dbUser?._id,
//     meals: orderedMeals,
//     totalPrice,
//     orderDate: new Date(),
//     customizations: payload.customizations,
//   });

//   return order;
// };

const createOrderInDB = async (user: JwtPayload, payload: { meals: { meal: string; quantity: number }[]; customizations?: string[] }) => {
  if (!payload?.meals?.length) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, "Meals are required");
  }

  const dbUser = await User.findById(user._id);
  const mealIds = payload.meals.map(({ meal }) => meal);
  const dbMeals = await Meal.find({ _id: { $in: mealIds } });

  if (dbMeals.length !== mealIds.length) {
    const foundMealIds = new Set(dbMeals.map(({ _id }) => _id.toString()));
    const missingMeals = payload.meals.filter(({ meal }) => !foundMealIds.has(meal));
    throw new AppError(StatusCodes.NOT_FOUND, `Meals not found: ${missingMeals.join(", ")}`);
  }

  let totalPrice = 0;
  const mealMap = new Map(dbMeals.map((meal) => [meal._id.toString(), meal]));

  const orderedMeals = payload.meals.map(({ meal, quantity }) => {
    const dbMeal = mealMap.get(meal)!;
    if (!dbMeal.availability) {
      throw new AppError(StatusCodes.NOT_ACCEPTABLE, `Meal ${dbMeal.name} is not available`);
    }
    totalPrice += dbMeal.price * quantity;
    return { meal: dbMeal._id, quantity };
  });

  return await Order.create({
    user: dbUser?._id,
    meals: orderedMeals,
    totalPrice,
    orderDate: new Date(),
    customizations: payload.customizations,
  });
};

export const OrderServices = {
  createOrderInDB,
};
