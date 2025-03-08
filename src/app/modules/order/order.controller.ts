import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderServices } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
  console.log("🚀 ~ createOrder ~ req:", req.body);
  const user = req.user;

  const result = await OrderServices.createOrderInDB(user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Order placed succesfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrderFromDB(req.query, req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Orders are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getCustomerOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getCustomerOrderFromDB(req.query, req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Orders are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getCustomerOrders,
};
