import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderServices } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await OrderServices.createOrderInDB(user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Order placed succesfully",
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
};
