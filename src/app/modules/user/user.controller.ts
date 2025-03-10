import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createMealProvider = catchAsync(async (req, res) => {
  const { password, mealProvider: mealProviderData } = req.body;

  const result = await UserServices.createMealProviderInDB(password, mealProviderData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Meal provider created successfully",
    data: result,
  });
});

const createCustomer = catchAsync(async (req, res) => {
  const { password, customer: customerData } = req.body;

  const result = await UserServices.createCustomerInDB(password, customerData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customer created successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const result = await UserServices.loginInDB(email, password);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const getMyProfile = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await UserServices.getMyProfileFromDB(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  const user = req.user;
  const updateData = req.body;

  const result = await UserServices.updateMyProfileInDB(user, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

export const UserControllers = {
  createMealProvider,
  createCustomer,
  login,
  getMyProfile,
  updateMyProfile,
};
