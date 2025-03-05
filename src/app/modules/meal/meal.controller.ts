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

const getSingleMeal = catchAsync(async (req, res) => {
  const { id: mealId } = req.params;
  const result = await MealServices.getSingleMealFromDB(mealId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Meal fetched successfully",
    data: result,
  });
});

const updateMeal = catchAsync(async (req, res) => {
  const { id: mealId } = req.params;
  const result = await MealServices.updateMealInDB(mealId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Meal updated successfully",
    data: result,
  });
});

const deleteMeal = catchAsync(async (req, res) => {
  const { id: mealId } = req.params;
  const result = await MealServices.deleteMealInDB(mealId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Meal deleted successfully",
    data: result,
  });
});

export const MealControllers = {
  createMeal,
  getAllMeals,
  getSingleMeal,
  updateMeal,
  deleteMeal,
};
