import { getBook } from "@/app/_actions"
import { Modal } from "@/components/shared/modal"

interface Props {
  params: {
    id: number
  }
}

export default async function BookModal({ params }: Props) {
  const book = await getBook(params.id)

  if (book?.error) return <h1>{book.error}</h1>
  if (book?.success) {
    return (
      <div>
        <Modal book={book.success} />
      </div>
    )
  }
}
