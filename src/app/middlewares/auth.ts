import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
    }

    // checking if the given token is valid
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
    } catch (err) {
      console.log("🚀 ~ returncatchAsync ~ err:", err);
      throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }
    const { email, role } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized dd!");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
