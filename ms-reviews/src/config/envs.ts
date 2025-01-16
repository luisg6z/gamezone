import * as joi from 'joi'
import 'dotenv/config'

interface EnvVars {
    PORT: number,
    DB_URI: string,
}

const envSchema = joi.object({
    PORT: joi.number().integer().required(),
    DB_URI: joi.string().required(),
})
.unknown(true)

const { error, value} = envSchema.validate(process.env)

if(error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
    port: envVars.PORT,
    dbUri: envVars.DB_URI,
}