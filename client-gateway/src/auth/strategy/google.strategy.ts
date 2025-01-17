import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import googleOauthConfig from "src/config/google-oauth.config";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(
        @Inject(googleOauthConfig.KEY)
        private googleConfiguration: ConfigType<typeof googleOauthConfig>,
        private authService: AuthService
    ) {
        super({
            clientID: googleConfiguration.clientId,
            clientSecret: googleConfiguration.secret,
            callbackURL: googleConfiguration.callbackURL,
            scope: ["email", "profile"],
        })
    }

    async validate(
        accessToken: string,
        refreshToke: string, 
        profile: any, 
        done: VerifyCallback
    ) {
        const user = this.authService.validateGoogleUser({
            email: profile.emails[0].value,
            name: profile.displayName
        })
        done(null, user);
    }
}