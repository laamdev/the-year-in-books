import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema"

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase<typeof schema> | undefined
}

let db: PostgresJsDatabase<typeof schema>

if (process.env.NODE_ENV === "production") {
  db = drizzle(
    postgres(process.env.NEXT_PUBLIC_SUPABASE_DB!, { prepare: false }),
    {
      schema,
    }
  )
} else {
  if (!global.db) {
    global.db = drizzle(
      postgres(process.env.NEXT_PUBLIC_SUPABASE_DB!, { prepare: false }),
      { schema }
    )
  }
  db = global.db
}

export { db }
