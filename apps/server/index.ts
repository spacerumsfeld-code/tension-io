import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/aws-lambda'
import { userRouter } from './src/routers/user.router.ts'
import { storyRouter } from './src/routers/story.router.ts'

const app = new Hono().basePath('/api').use(cors())

const apiRouter = app.route('/user', userRouter).route('/story', storyRouter)

export const handler = handle(apiRouter)

export type ApiSpec = typeof apiRouter
