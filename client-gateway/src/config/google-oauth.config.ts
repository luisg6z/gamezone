import { registerAs } from "@nestjs/config";

export default registerAs("googleOAuth", () => ({
    clientId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}))