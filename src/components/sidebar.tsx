"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useCats } from "@/hooks/useCats";

const Sidebar = () => {
  const { cats } = useCats();

  return (
    <div className="w-full max-w-[400px] h-full flex flex-col">
      <div className="p-4">
        <h1 className="font-bold">Cats</h1>
      </div>
      <div className="flex overflow-y-auto flex-col gap-4 h-full p-4">
        {cats.map((cat) => (
          <Card key={cat._id}>
            <CardHeader>
              <CardTitle>{cat.nickname}</CardTitle>
              <CardDescription className="mb-2">
                <div className="w-full rounded overflow-hidden aspect-square">
                  <Image
                    src={
                      cat.imageUrl
                        ? cat.imageUrl
                        : "https://via.placeholder.com/500x500"
                    }
                    alt={cat.nickname}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
