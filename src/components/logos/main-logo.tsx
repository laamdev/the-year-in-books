import { cn } from "@/lib/utils"

export const MainLogo = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="1.5"
      clipRule="evenodd"
      viewBox="0 0 540 540"
      className={cn(className)}
    >
      <path
        fill="none"
        strokeWidth="10"
        d="M270 20v500M270 20c80.613 174.945-4.777 341.469-250 500M269.449 20c-80.613 174.945 4.776 341.469 250 500"
      ></path>
    </svg>
  )
}
