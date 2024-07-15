import { toast } from "sonner";
import { LogOut } from "lucide-react";

import { queryClient } from "@/app/layout";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    toast.success("Log out successful");
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <Button variant="outline" onClick={logout}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </Button>
  );
}
