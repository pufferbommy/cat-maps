import { toast } from "sonner";
import { useStore } from "@nanostores/react";
import { Loader2, LogOut } from "lucide-react";

import { Button } from "../ui/button";
import { clearProfile } from "@/store/profile";
import { clearMyLikedCats } from "@/store/cats";
import { $isLoading, setFullLoader } from "@/store/full-loader";

const LogoutButton = () => {
  const isLoading = useStore($isLoading);

  const logout = () => {
    setFullLoader(true);
    setTimeout(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success("Log out successful");
      clearMyLikedCats();
      clearProfile();
      setFullLoader(false);
    }, 250);
  };

  return (
    <Button
      disabled={isLoading}
      onClick={logout}
      variant="secondary"
      size="icon"
      className="w-10 h-10 hover:w-auto transition-all hover:px-4 hover:gap-2 flex-shrink-0 group"
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <LogOut size={16} />
      )}
      <span className="w-0 transition-[width] group-hover:w-auto overflow-hidden">
        Log out
      </span>
    </Button>
  );
};

export default LogoutButton;
