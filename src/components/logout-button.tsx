import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button onClick={logout} variant="secondary" className="gap-2">
      ออกจากระบบ
    </Button>
  );
};

export default LogoutButton;
