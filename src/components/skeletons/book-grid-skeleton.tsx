import { BookGrid } from "@/components/book-grid"
import { Skeleton } from "@/components/ui/skeleton"

export const BookGridSkeleton = () => {
  return (
    <BookGrid>
      {[...Array(5)].map((_, idx) => (
        <Skeleton
          key={idx}
          className="relative aspect-[3/5] rounded-md shadow"
        />
      ))}
    </BookGrid>
  )
}
