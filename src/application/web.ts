import express from 'express'
import { publicRouter } from '../route/public-api'
import { errorMiddelware } from '../middelware/error-middelware'

export const web = express()
web.use(express.json())

web.use(publicRouter)

web.use(errorMiddelware)