"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

import { Input } from "@/components/ui/input"

export const SearchBar = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", "1")

    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
    }

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <Input
      placeholder="Search by title, author, etc..."
      onChange={(e) => {
        handleSearch(e.target.value)
      }}
      defaultValue={searchParams.get("query"?.toString())!}
    />
  )
}

// // export const Search = () => {
// //   const [inputValue, setInputValue] = useState<string>("");
// //   const [debouncedValue, setDebouncedValue] = useState<string>("");
// //   const [mounted, setMounted] = useState<boolean>(false);
// //   const router = useRouter();
// //   const pathname = usePathname();
// //   const [isPending, startTransition] = useTransition();
// //   const [totalResults, setTotalResults] = useState(0);
// //   const [currentPage, setCurrentPage] = useState(1);

// //   const handleSearchParams = useCallback(
// //     (debouncedValue: string) => {
// //       let params = new URLSearchParams(window.location.search);
// //       if (debouncedValue.length > 0) {
// //         params.set("search", debouncedValue);
// //       } else {
// //         params.delete("search");
// //       }
// //       startTransition(() => {
// //         router.replace(`${pathname}?${params.toString()}`);
// //       });
// //     },
// //     [pathname, router]
// //   );

// //   // SET INITIAL PARAMS
// //   useEffect(() => {
// //     const params = new URLSearchParams(window.location.search);
// //     const searchQuery = params.get("search") ?? "";
// //     setInputValue(searchQuery);
// //   }, []);

// //   // SET MOUNTED
// //   useEffect(() => {
// //     if (debouncedValue.length > 0 && !mounted) {
// //       setMounted(true);
// //     }
// //   }, [debouncedValue, mounted]);

// //   // Debounce input value
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setDebouncedValue(inputValue);
// //     }, 500);

// //     return () => {
// //       clearTimeout(timer);
// //     };
// //   }, [inputValue]);

// //   // Search Params
// //   useEffect(() => {
// //     if (mounted) handleSearchParams(debouncedValue);
// //   }, [debouncedValue, handleSearchParams, mounted]);

// //   return (
// //     <div className="relative mt-8 mb-5">
// //       <Input
// //         value={inputValue}
// //         onChange={(e) => {
// //           setInputValue(e.target.value);
// //         }}
// //         placeholder="Search books"
// //       />
// //       {isPending && (
// //         <div className="absolute top-2 right-2">
// //           <ArrowPathIcon className="w-4 h-4 animate-spin fill-slate-500" />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };
