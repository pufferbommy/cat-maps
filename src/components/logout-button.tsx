import { toast } from "sonner";

import { Button } from "./ui/button";
import { clearProfile } from "@/store/profile";

const LogoutButton = () => {
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    toast.success("Logout successful");
    clearProfile();
  };

  return (
    <Button onClick={logout} variant="secondary" className="gap-2">
      Logout
    </Button>
  );
};

export default LogoutButton;
