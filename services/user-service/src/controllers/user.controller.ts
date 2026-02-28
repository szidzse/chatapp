import { userService } from "@/services/user.service";
import type { AsyncHandler } from "@chatapp/common";

export const getUser: AsyncHandler = async (req, res) => {
  try {
    const {} = req.params as unknown as { id: string };
  } catch (error) {}
};
