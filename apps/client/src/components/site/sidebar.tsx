"use client";

import { useCatQuery } from "@/hooks/use-cat-query";
import CatCard from "../cat/cat-card";
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";

const Sidebar = () => {
  const { data: cats, isLoading } = useQuery(useCatQuery());

  return (
    <div className="h-1/2 sm:h-full sm:max-w-[300px] w-full flex flex-col border-r border-r-gray-100">
      <div className="flex p-4 overflow-y-auto items-center flex-col gap-4 h-full">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="max-w-[300px] w-full shrink-0 aspect-square rounded-lg"
              />
            ))
          : cats?.map((cat) => <CatCard key={cat.id} cat={cat} />)}
      </div>
    </div>
  );
};

export { Sidebar };
