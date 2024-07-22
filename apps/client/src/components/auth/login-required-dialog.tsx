import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import LoginForm from "./login-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import RegisterForm from "./register-form";
import { Login } from "@/schema/login.schema";
import { Register } from "@/schema/register.schema";
import { useUserLogin, useUserRegister } from "@/hooks/use-user";

interface LoginRequiredAlertDialogProps {
  isAlertDialogOpen: boolean;
  setIsAlertDialogOpen: (isOpen: boolean) => void;
  description?: string;
}

const LoginRequiredAlertDialog = ({
  isAlertDialogOpen,
  setIsAlertDialogOpen,
  description,
}: LoginRequiredAlertDialogProps) => {
  const [open, setOpen] = useState(false);

  const initialAction = "login";
  const [action, setAction] = useState<"login" | "register">(initialAction);

  const isLogin = (action: "login" | "register") => action === "login";

  const title = (action: "login" | "register", inverse: boolean = false) => {
    if (inverse) {
      return isLogin(action) ? "Register" : "Log in";
    }
    return isLogin(action) ? "Log in" : "Register";
  };

  const handleToggleAction = () => {
    setAction((prev) => {
      return isLogin(prev) ? "register" : "login";
    });
  };

  const userLogin = useUserLogin();
  const userRegister = useUserRegister();

  const onSubmit = async (values: Login | Register) => {
    if (isLogin(action)) {
      userLogin.mutate(values as Login);
    } else {
      userRegister.mutate(values as Register);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Required</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <DialogTrigger asChild>
                <Button>{title(initialAction)}</Button>
              </DialogTrigger>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title(action)}</DialogTitle>
        </DialogHeader>
        {isLogin(action) ? (
          <LoginForm isLoading={userLogin.isPending} onSubmit={onSubmit} />
        ) : (
          <RegisterForm
            isLoading={userRegister.isPending}
            onSubmit={onSubmit}
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

export default LoginRequiredAlertDialog;
