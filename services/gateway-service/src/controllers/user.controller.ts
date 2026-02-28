import { userProxyService } from "@/services/user-proxy.service";
import { userIdParamsSchema } from "@/validation/user.schema";
import { AsyncHandler } from "@chatapp/common";

export const getUser: AsyncHandler = async (req, res, next) => {
  try {
    const { id } = userIdParamsSchema.parse(req.params);
    const response = await userProxyService.getUserById(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers: AsyncHandler = async (req, res, next) => {
  try {
    const response = await userProxyService.getAllUsers();
    res.json(response);
  } catch (error) {
    next(error);
  }
};
