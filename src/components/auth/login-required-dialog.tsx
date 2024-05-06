import { useState } from "react";
import { useStore } from "@nanostores/react";

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
import { getCats } from "@/services/cats";
import RegisterForm from "./register-form";
import { Login } from "@/schema/login.schema";
import { auth, getProfile } from "@/services/auth";
import { setFullLoader } from "@/store/full-loader";
import { Register } from "@/schema/register.schema";
import { $isLoadingProfile } from "@/store/profile";

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
  const isLoadingProfile = useStore($isLoadingProfile);
  const initialAction = "login";
  const [action, setAction] = useState<"login" | "register">(initialAction);
  const [isActioning, setIsActioning] = useState(false);

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

  const onSubmit = async (values: Login | Register) => {
    try {
      setFullLoader(true);
      setIsActioning(true);
      const response = await auth(action, values);
      const { accessToken, refreshToken } = response.data.data!;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setOpen(false);
      const promises = [];
      promises.push(getProfile());
      if (action === "login") {
        promises.push(getCats());
      }
      await Promise.all(promises);
    } catch (error) {
      console.error(error);
    } finally {
      setFullLoader(false);
      setIsActioning(false);
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
                <Button disabled={isLoadingProfile}>
                  {title(initialAction)}
                </Button>
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
          <LoginForm isLoading={isActioning} onSubmit={onSubmit} />
        ) : (
          <RegisterForm isLoading={isActioning} onSubmit={onSubmit} />
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
