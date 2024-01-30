import { Skeleton } from "@/components/ui/skeleton"

export const BookCardSkeleton = () => {
  return <Skeleton className="relative aspect-[3/5] h-min rounded-md shadow" />
}

// // import { BookGrid } from "@/components/books/book-grid"
// // import { Skeleton } from "@/components/ui/skeleton"

// // interface Props {
// //   size?: "sm" | "DEFAULT"
// // }

// // export const BookGridSkeleton = ({ size }: Props) => {
// //   const arrayLength = size === "sm" ? 7 : 5
// //   return (
// //     <BookGrid>
// //       {[...Array(arrayLength)].map((_, idx) => (
// //         <Skeleton
// //           key={idx}
// //           className="relative aspect-[3/5] rounded-md shadow"
// //         />
// //       ))}
// //     </BookGrid>
// //   )
// // }
