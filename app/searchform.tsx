"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("query") ?? "");

  useEffect(() => {
    setSearch(searchParams.get("query") ?? "");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enhancedParams = new URLSearchParams(searchParams.toString());
    const value = search.trim();

    if (value) {
      enhancedParams.set("query", value);
    } else {
      enhancedParams.delete("query");
    }



    const url = enhancedParams.toString() ? `/?${enhancedParams.toString()}` : "/";
    router.push(url);
  };
  

  return (
    <form onSubmit={handleSubmit} className="w-full flex">
      <div className="flex w-full items-center rounded-2xl bg-[#E5E5E5] ">
        
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name="query"
          placeholder="Search"
          autoComplete="off"
          className="w-full bg-transparent text-2xl text-black placeholder:text-black/70 outline-none px-4 py-4"
        />
        
      <div className="bg-[#dbd7d9] h-full">
      <button className=" px-5 text-3xl leading-none w-full h-full">⌕</button>
      </div>
        
      </div>
    </form>
  );
}