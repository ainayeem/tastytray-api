import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Meal } from "../meal/meal.model";
import { MealProvider } from "../mealProvider/mealProvider.model";
import { User } from "../user/user.model";
import { Order } from "./order.model";

const createOrderInDB = async (user: JwtPayload, payload: { meals: { meal: string; quantity: number }[]; customizations?: string[] }) => {
  console.log("payload", payload);
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
    mealProvider: dbMeals[0].mealProvider,
    meals: orderedMeals,
    totalPrice,
    orderDate: new Date(),
    customizations: payload.customizations,
  });
};

const getAllOrderFromDB = async (query: Record<string, unknown>, user: JwtPayload) => {
  const mealProvider = await MealProvider.findOne({ user: user._id });
  if (!mealProvider) {
    throw new AppError(StatusCodes.NOT_FOUND, " Meal provider not found");
  }

  const OrderSearchableFields = ["status"];
  const orderQuery = new QueryBuilder(Order.find({ mealProvider: mealProvider._id }).populate("meals.meal"), query)
    .search(OrderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getCustomerOrderFromDB = async (query: Record<string, unknown>, user: JwtPayload) => {
  const OrderSearchableFields = ["status"];
  const orderQuery = new QueryBuilder(Order.find({ user: user._id }).populate("user mealProvider meals.meal"), query)
    .search(OrderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return {
    meta,
    result,
  };
};

export const OrderServices = {
  createOrderInDB,
  getAllOrderFromDB,
  getCustomerOrderFromDB,
};
