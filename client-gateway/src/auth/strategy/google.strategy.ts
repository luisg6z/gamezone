import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import googleOauthConfig from "src/config/google-oauth.config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(
        @Inject(googleOauthConfig.KEY) private googleConfiguration: ConfigType<typeof googleOauthConfig>
    ) {
        super({
            clientID: googleConfiguration.clientId,
            clientSecret: googleConfiguration.secret,
            callbackURL: googleConfiguration.callbackURL,
            scope: ["email", "profile"],
        })
    }

    async validate(accessToken: string) {}
}