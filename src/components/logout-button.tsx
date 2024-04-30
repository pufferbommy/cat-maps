import { toast } from "sonner";
import { useState } from "react";

import { Button } from "./ui/button";
import { clearProfile } from "@/store/profile";
import { LogOut } from "lucide-react";

const LogoutButton = ({ disabled = false }: { disabled?: boolean }) => {
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
    <Button
      disabled={disabled}
      onClick={logout}
      size="icon"
      variant="secondary"
      className="gap-2 w-10 h-10 flex-shrink-0"
    >
      <LogOut size={16} />
    </Button>
  );
};

export default LogoutButton;
