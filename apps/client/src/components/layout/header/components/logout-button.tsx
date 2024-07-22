import { toast } from "sonner";
import { LogOut } from "lucide-react";

import { queryClient } from "@/lib/react-query";
import { Button } from "@/components/ui/button";
import { keys as userKeys } from "@/hooks/use-user";
import { keys as catsKeys } from "@/hooks/use-cats";

export function LogoutButton() {
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    toast.success("Log out successful");
    queryClient.invalidateQueries({ queryKey: userKeys.getUserProfile });
    queryClient.invalidateQueries({ queryKey: catsKeys.getAllCats });
  };

  return (
    <Button className="aspect-square p-0 inline-flex" onClick={logout}>
      <LogOut className="size-4" />
    </Button>
  );
}
