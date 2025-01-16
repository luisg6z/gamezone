import * as joi from 'joi'
import 'dotenv/config'

interface EnvVars {
    PORT: number
}

const envSchema = joi.object({
    PORT: joi.number().integer().required(),
})
.unknown(true)

const { error, value} = envSchema.validate(process.env)

if(error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
    port: envVars.PORT,
}