import { toast } from "sonner";
import { useState } from "react";

import { Button } from "./ui/button";
import { clearProfile } from "@/store/profile";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success("Logout successful");
      clearProfile();
      setIsLoading(false);
    }, 250);
  };

  return (
    <Button onClick={logout} variant="secondary" className="gap-2">
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default LogoutButton;
