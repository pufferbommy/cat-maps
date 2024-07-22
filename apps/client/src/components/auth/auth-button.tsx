"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  useGetUserProfile,
  useUserLogin,
  useUserRegister,
} from "@/hooks/use-user";
import LoginForm from "./login-form";
import { Button } from "../ui/button";
import RegisterForm from "./register-form";
import { Login } from "@/schema/login.schema";
import { Register } from "@/schema/register.schema";

type Action = "login" | "register";

const AuthButton = ({
  initialAction,
  variant,
}: {
  initialAction: Action;
  variant?: "outline" | "default";
}) => {
  const { isLoading } = useGetUserProfile();
  const [action, setAction] = useState(initialAction);
  const [open, setOpen] = useState(false);

  const isLogin = (action: Action) => action === "login";

  const title = (action: Action, inverse: boolean = false) => {
    if (inverse) {
      return isLogin(action) ? "Register" : "Log in";
    }
    return isLogin(action) ? "Log in" : "Register";
  };

  const handleToggleAction = () => {
    setAction((prev) => (isLogin(prev) ? "register" : "login"));
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
      <DialogTrigger asChild>
        <Button disabled={isLoading} variant={variant}>
          {title(initialAction)}
        </Button>
      </DialogTrigger>
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

export default AuthButton;
