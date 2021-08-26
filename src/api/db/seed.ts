/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()
const db = new PrismaClient()

/*
 * Seed data is database data that needs to exist for your app to run.
 *
 * @see https://www.prisma.io/docs/reference/api-reference/command-reference#migrate-reset
 * @see https://www.prisma.io/docs/guides/prisma-guides/seed-database
 * @see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#upsert
 * @see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
 */
async function main(): Promise<void> {
  // // Change to match your data model and seeding needs
  // const data = [
  //   { name: 'alice', email: 'alice@example.com' },
  //   { name: 'mark', email: 'mark@example.com' },
  //   { name: 'jackie', email: 'jackie@example.com' },
  //   { name: 'bob', email: 'bob@example.com' },
  // ]
  // // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
  // // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
  // return Promise.all(
  //   data.map(async (user) => {
  //     const record = await db.user.create({
  //       data: { name: user.name, email: user.email },
  //     })
  //     console.log(record)
  //   })
  // )
}

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await db.$disconnect()
//   })

export default main
