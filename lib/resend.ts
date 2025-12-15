import "server-only";
import { Resend } from "resend";
import { env } from "./env";

export const resend = new Resend(env.Resend_API_KEY);
