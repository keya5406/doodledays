import axios from "axios";
import { z } from "zod";
import { loginSchema, registerSchema } from "../../../shared/schemas/auth.schema";

export const loginUser = async (data: z.infer<typeof loginSchema>) => {
  const res = await axios.post("http://localhost:5000/api/auth/login", data);
  return res.data;
};

export const registerUser = async (data: z.infer<typeof registerSchema>) => {
  const res = await axios.post("http://localhost:5000/api/auth/register", data);
  return res.data;
};
