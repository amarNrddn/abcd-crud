import express from 'express'
import { publicRouter } from '../route/public-api'
import { errorMiddelware } from '../middelware/error-middelware'
import { apiRouter } from '../route/api'

export const web = express()
web.use(express.json())

web.use(publicRouter)
web.use(apiRouter)

web.use(errorMiddelware)