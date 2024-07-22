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
    <Button variant="outline" onClick={logout}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </Button>
  );
}
