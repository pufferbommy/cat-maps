"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import LoginForm from "./login-form";
import { Button } from "../ui/button";
import { login } from "@/mutations/login";
import RegisterForm from "./register-form";
import { queryClient } from "@/app/layout";
import { Login } from "@/schema/login.schema";
import { register } from "@/mutations/register";
import { Register } from "@/schema/register.schema";
import { useUserQuery } from "@/hooks/use-user-query";

type Action = "login" | "register";

const AuthButton = ({
  initialAction,
  variant,
}: {
  initialAction: Action;
  variant?: "outline" | "default";
}) => {
  const { isLoading } = useQuery(useUserQuery());
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

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const onSubmit = async (values: Login | Register) => {
    if (isLogin(action)) {
      loginMutation.mutate(values);
    } else {
      registerMutation.mutate(values);
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
          <LoginForm isLoading={loginMutation.isPending} onSubmit={onSubmit} />
        ) : (
          <RegisterForm
            isLoading={registerMutation.isPending}
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
