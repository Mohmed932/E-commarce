import bcrypt from "bcryptjs";
export const comparePassword = async (password, hasePassword) => {
  const compare = await bcrypt.compare(password, hasePassword);
  return compare;
};
