import crypto from "crypto";

export const randomToken = async (length = 32) => {
  const token = await crypto.randomBytes(length).toString("hex");
  return token;
};
console.log(randomToken(32));
