import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.Github_Client_ID,
      clientSecret: env.Github_Client_Secret,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          // Send the OTP for sign in
          await resend.emails.send({
            from: "MO-LMS <onboarding@resend.dev>",
            to: [email],
            subject: "MO-LMS email verification",
            html: `<p>Your OTP is <strong>${otp}</strong></p>`,
          });
        } else if (type === "email-verification") {
        } else {
          // Send the OTP for password reset
        }
      },
      otpLength: 6,
      expiresIn: 300,
    }),
  ],
});
