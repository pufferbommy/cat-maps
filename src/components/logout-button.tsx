import { toast } from "sonner";
import { LogOut } from "lucide-react";

import { Button } from "./ui/button";
import { clearProfile } from "@/store/profile";
import { setFullLoader } from "@/store/full-loader";

const LogoutButton = ({ disabled = false }: { disabled?: boolean }) => {
  const logout = () => {
    setFullLoader(true);
    setTimeout(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success("Logout successful");
      clearProfile();
      setFullLoader(false);
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
