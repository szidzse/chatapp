import { sequelize } from "@/db/sequelize";
import { UserCredentials } from "@/models";
import { AuthResponse, RegisterInput } from "@/types/auth";
import { HttpError } from "@chatapp/common";
import { Op } from "sequelize";

export const register = async (input: RegisterInput): Promise<AuthResponse> => {
  const existing = await UserCredentials.findOne({
    where: {
      email: { [Op.eq]: input.email },
    },
  });

  if (existing) {
    throw new HttpError(409, "Email already exists");
  }

  const transaction = await sequelize.transaction();
  try {
    const passwordHash = await
  } catch (error) {

  }
};
