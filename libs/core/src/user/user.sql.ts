import { pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable(
    'users',
    {
        id: uuid().defaultRandom().primaryKey().notNull(),
        clerkId: text('clerk_id').notNull(),
        email: text().notNull(),
        createdAt: timestamp('created_at', { mode: 'string' })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp('updated_at', { mode: 'string' })
            .defaultNow()
            .notNull(),
        birthday: text(),
        firstName: text('first_name'),
        lastName: text('last_name'),
        profileImageUrl: text('profile_image_url'),
        gender: text(),
    },
    (table) => {
        return {
            usersClerkIdUnique: unique('users_clerk_id_unique').on(
                table.clerkId,
            ),
            usersEmailUnique: unique('users_email_unique').on(table.email),
        }
    },
)