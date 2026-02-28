import { userService } from "@/services/user.service";
import { UserIdParams } from "@/validation/user.schema";
import type { AsyncHandler } from "@chatapp/common";

export const getUser: AsyncHandler = async (req, res, next) => {
  try {
    const { id } = req.params as unknown as UserIdParams;
    const user = await userService.getUserById(id);
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};
