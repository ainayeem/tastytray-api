import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MealServices } from "./meal.service";

const createMeal = catchAsync(async (req, res) => {
  const result = await MealServices.createMealInDB(req.body, req.user._id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: " Meal created successfully",
    data: result,
  });
});

const getAllMeals = catchAsync(async (req, res) => {
  const result = await MealServices.getAllMealsFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All meals fetched successfully",
    meta: result.meta,
    data: result.result,
  });
});

export const MealControllers = {
  createMeal,
  getAllMeals,
};
