import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".env" });

export const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTHO_BASE_URL || "http://localhost:7777",
  clientID: process.env.AUTH0_CLIENT_ID || "6VG3z0uVbEQMWCHs53xmytNt9kP1TEni",
  issuerBaseURL: "https://dev-8r8lnhe1rjmtjpq7.us.auth0.com",
};
