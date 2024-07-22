import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import LoginForm from "./login-form";
import { Button } from "../ui/button";
import RegisterForm from "./register-form";
import { Login } from "@/schema/login.schema";
import { Register } from "@/schema/register.schema";
import { useUserLogin, useUserRegister } from "@/hooks/use-user";

type AuthAction = "login" | "register";

interface AuthDialogProps {
  trigger?: ReactNode;
  initialAction: AuthAction;
}

const AuthDialog = ({ trigger, initialAction }: AuthDialogProps) => {
  const [action, setAction] = useState(initialAction);
  const [open, setOpen] = useState(false);
  const userLogin = useUserLogin();
  const userRegister = useUserRegister();

  const isLogin = (action: AuthAction) => action === "login";

  const title = (action: AuthAction, inverse: boolean = false) => {
    if (inverse) {
      return isLogin(action) ? "Register" : "Log in";
    }
    return isLogin(action) ? "Log in" : "Register";
  };

  const handleToggleAction = () => {
    setAction((prev) => (isLogin(prev) ? "register" : "login"));
  };

  const handleSubmit = (data: Login | Register) => {
    if (isLogin(action)) {
      userLogin.mutate(data as Login, {
        onSuccess: () => setOpen(false),
      });
    } else {
      userRegister.mutate(data as Register, {
        onSuccess: () => setOpen(false),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title(action)}</DialogTitle>
        </DialogHeader>
        {isLogin(action) ? (
          <LoginForm isLoading={userLogin.isPending} onSubmit={handleSubmit} />
        ) : (
          <RegisterForm
            isLoading={userRegister.isPending}
            onSubmit={handleSubmit}
          />
        )}
        <DialogFooter>
          <div className="flex items-center gap-2 text-sm justify-center">
            <p className="text-muted-foreground">
              {isLogin(action)
                ? "Don't have an account yet?"
                : "Already have an account?"}
            </p>
            <Button onClick={handleToggleAction} className="p-0" variant="link">
              {title(action, true)}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
