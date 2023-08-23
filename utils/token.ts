import { randomBytes } from "crypto";
import { TOKEN_CRYPTO_DEFAULT } from "./constants";

export const generateRandomToken = (length: number = TOKEN_CRYPTO_DEFAULT) =>
  randomBytes(Math.ceil(length / 2)).toString("hex");
