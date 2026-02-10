import { sequelize } from "@/db/sequelize";
import { UserCredentials } from "@/models/user-credentials.model";

export const initModels = async () => {
  await sequelize.sync();
};

export { UserCredentials };
