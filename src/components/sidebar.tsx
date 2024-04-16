"use client";

import Image from "next/image";
import CountUp from "react-countup";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";
import { useCats } from "@/hooks/useCats";
import { Button } from "./ui/button";

const Sidebar = () => {
  const { cats, isLoading } = useCats();

  return (
    <div className="max-w-[300px] w-full shadow flex flex-col h-full">
      <div className="flex px-4 mb-6 pt-4 justify-between items-center">
        <h1 className="font-bold text-xl">Cat Maps</h1>
        <h2 className="before:mr-2 text-lg before:content-['🐱']">
          <CountUp start={0} end={cats.length} />
        </h2>
      </div>
      <div className="flex px-4 mb-4 overflow-y-auto flex-col gap-4 h-full">
        {isLoading && (
          <div>
            Loading...
            {/* <Skeleton className="w-full" /> */}
          </div>
        )}
        {cats.map((cat) => (
          <Card key={cat._id}>
            <CardHeader>
              <CardTitle>
                <div className="relative cursor-pointer aspect-square">
                  <Image
                    sizes="100%"
                    priority
                    src={cat.imageUrl}
                    alt="cat"
                    fill
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="px-4 pb-4 gap-2 grid grid-cols-2">
        <Button variant="outline">Login</Button>
        <Button>Register</Button>
      </div>
    </div>
  );
};

export { Sidebar };
