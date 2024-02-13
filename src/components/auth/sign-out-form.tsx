import { signOutAction } from "@/app/actions/auth-actions"
import { Button } from "@/components/ui/button"

export const SignOutForm = () => {
  return (
    <form action={signOutAction}>
      <Button className="" variant="secondary">{`Log Out`}</Button>
    </form>
  )
}
