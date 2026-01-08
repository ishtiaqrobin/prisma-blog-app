import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL || "http://localhost:3000"],

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

        const info = await transporter.sendMail({
          from: '"Prisma Blog App" <robin.pass36@gmail.com>',
          to: user.email,
          subject: "Verify Your Email - Prisma Blog App",
          text: `Hello ${user.name || "User"},

        Thank you for signing up for Prisma Blog App. Please verify your email address by visiting: ${verificationUrl}

        If you did not request this, please ignore this email.

        Best regards,
        Prisma Blog App Team`, // Plain-text version of the message
          html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0     auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333;">Verify Your Email</h2>
          <p>Hello ${user.name || "User"},</p>
          <p>Thank you for signing up for Prisma Blog App. Please verify your email address by clicking the button below:</p>
          <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p>If you did not request this, please ignore this email.</p>
          <p>Best regards,<br>Prisma Blog App Team</p>
      </div>
      `, // HTML version of the message
        });

        console.log("Message sent: ", info.messageId);
      } catch (error) {
        console.error("Error sending verification email: ", error);
        throw new Error("Could not send verification email");
      }
    },
  },

  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
