"server only"

import { unstable_noStore as noStore } from "next/cache"

import { ApiBook, ApiBookFormated } from "@/types"

export const ITEMS_PER_PAGE = 6

export const fetchFilteredBooks = async (
  query?: string,
  currentPage?: number
) => {
  noStore()
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    let books: ApiBookFormated[] = []
    let count: number = 0

    let res = await fetch(
      // // `https://openlibrary.org/search.json?q=hello%20world&page=${page + 1}`,
      `https://openlibrary.org/search.json?q=${query}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
      {
        method: "GET",
      }
    )

    if (res.ok) {
      let data = await res.json()
      data.docs.forEach((book: ApiBook) =>
        books.push({
          title: book.title,
          author: book.author_name,
          year: book.first_publish_year,
          version: book._version_,
          pages: book.number_of_pages_median,
          cover: book.cover_i,
          status: "want_to_readgit sat",
        })
      )

      count = data.numFound
    }

    return {
      books,
      count,
    }
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch card data.")
  }
}

// // export const getChallenge = async () => {
// //   const { userId } = await auth()

// //   if (!userId) {
// //     return { error: "Please sign in to fetch your challenge." }
// //   }

// //   return db.query.challenges.findFirst({
// //     where: eq(challenges.user_id, userId),
// //     with: {
// //       books: true,
// //     },
// //   })
// // }

// // export const fetchInvoicesPages = async (query: string) => {
// //   noStore();
// //   try {
// //     const count = await sql`SELECT COUNT(*)
// //     FROM invoices
// //     JOIN customers ON invoices.customer_id = customers.id
// //     WHERE
// //       customers.name ILIKE ${`%${query}%`} OR
// //       customers.email ILIKE ${`%${query}%`} OR
// //       invoices.amount::text ILIKE ${`%${query}%`} OR
// //       invoices.date::text ILIKE ${`%${query}%`} OR
// //       invoices.status ILIKE ${`%${query}%`}
// //   `;

// //     const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
// //     return totalPages;
// //   } catch (error) {
// //     console.error("Database Error:", error);
// //     throw new Error("Failed to fetch total number of invoices.");
// //   }
// // };
