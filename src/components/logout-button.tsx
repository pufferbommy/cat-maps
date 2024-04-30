import { toast } from "sonner";
import { useStore } from "@nanostores/react";
import { Loader2, LogOut } from "lucide-react";

import { Button } from "./ui/button";
import { clearProfile } from "@/store/profile";
import { $isLoading, setFullLoader } from "@/store/full-loader";

const LogoutButton = () => {
  const isLoading = useStore($isLoading);

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
      disabled={isLoading}
      onClick={logout}
      size="icon"
      variant="secondary"
      className="gap-2 w-10 h-10 flex-shrink-0"
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <LogOut size={16} />
      )}
    </Button>
  );
};

export default LogoutButton;
