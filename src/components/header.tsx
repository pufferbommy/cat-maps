import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-primary flex justify-between p-2">
      <Avatar>
        <AvatarFallback>s</AvatarFallback>
      </Avatar>
      <Button variant="secondary">Login</Button>
    </header>
  );
};

export default Header;
