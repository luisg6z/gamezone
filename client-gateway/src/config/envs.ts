import * as joi from 'joi'
import 'dotenv/config'

interface EnvVars {
    PORT: number,
    GAMES_MS_HOST: string,
    GAMES_MS_PORT: number,
    REVIEWS_MS_HOST: string,
    REVIEWS_MS_PORT: number
}

const envSchema = joi.object({
    PORT: joi.number().integer().required(),
    GAMES_MS_HOST: joi.string().required(),
    GAMES_MS_PORT: joi.number().integer().required(),
    REVIEWS_MS_HOST: joi.string().required(),
    REVIEWS_MS_PORT: joi.number().integer().required()
})
.unknown(true)

const { error, value} = envSchema.validate(process.env)

if(error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
    port: envVars.PORT,
    gamesMsHost: envVars.GAMES_MS_HOST,
    gamesMsPort: envVars.GAMES_MS_PORT,
    reviewsMsHost: envVars.REVIEWS_MS_HOST,
    reviewsMsPort: envVars.REVIEWS_MS_PORT,
}