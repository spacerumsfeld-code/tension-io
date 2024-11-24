import { z } from 'zod'
import { router } from '../_internals/router.ts'
import { handleAsync } from '@utils'
import { baseProcedure } from '../_internals/index.ts'
import { Story, ZCreateStory } from '@core'
import { publishStorySubmittedEvent } from '@clients/queue.client.ts'
import { HTTPException } from 'hono/http-exception'

export const storyRouter = router({
    submitStory: baseProcedure
        .input(ZCreateStory)
        .mutation(async ({ c, input }) => {
            const [_, error] = await handleAsync(
                publishStorySubmittedEvent({
                    includeNarration: input.includeNarration,
                    length: input.length,
                    ownerId: input.userId,
                    title: input.storyTitle,
                    scenario: input.scenario,
                    tensionLevel: input.tension,
                    theme: input.selectedTheme,
                    tone: input.selectedTone,
                    setting: input.selectedSetting,
                }),
            )
            if (error) {
                console.error(error)
                throw new HTTPException(400, {
                    message: (error as Error).message,
                })
            }

            return c.superjson({
                success: true,
                message: 'Story submitted successfully',
            })
        }),
    getUserStories: baseProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ c, input }) => {
            const [getUserStoriesResponse, userStoriesError] =
                await handleAsync(
                    Story.getUserStories({
                        userId: input.userId,
                    }),
                )
            if (userStoriesError) {
                console.error(userStoriesError)
                throw new HTTPException(400, {
                    message: (userStoriesError as Error).message,
                })
            }

            return c.superjson({
                stories: getUserStoriesResponse!,
                success: true,
            })
        }),
})
