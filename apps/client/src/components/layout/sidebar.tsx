import CatCard from "../cat/cat-card";
import { Skeleton } from "../ui/skeleton";

import { useGetAllCats } from "@/hooks/use-cats";

export const Sidebar = () => {
  const { data: cats = [], isLoading } = useGetAllCats();

  return (
    <div className="p-4 w-[calc(77px*4)] space-y-4 flex-shrink-0 overflow-auto border-r-gray-100 dark:border-r-gray-800">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="w-full aspect-square" />
          ))
        : cats.map((cat) => <CatCard key={cat.id} cat={cat} />)}
    </div>
  );
};
