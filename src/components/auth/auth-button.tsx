"use client";

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
import { Button } from "../ui/button";
import { getCats } from "@/services/cats";
import RegisterForm from "./register-form";
import { Login } from "@/schema/login.schema";
import { auth, getProfile } from "@/services/auth";
import { Register } from "@/schema/register.schema";
import { $isLoadingProfile } from "@/store/profile";
import { setFullLoader } from "@/store/full-loader";
import { setCats } from "@/store/cats";

const AuthButton = ({
  initialAction,
  variant,
}: {
  initialAction: "login" | "register";
  variant?: "outline" | "default";
}) => {
  const isLoadingProfile = useStore($isLoadingProfile);

  const [action, setAction] = useState(initialAction);
  const [isActioning, setIsActioning] = useState(false);
  const [open, setOpen] = useState(false);

  const isLogin = (action: typeof initialAction) => action === "login";

  const title = (action: typeof initialAction, inverse: boolean = false) => {
    if (inverse) {
      return isLogin(action) ? "Register" : "Log in";
    }
    return isLogin(action) ? "Log in" : "Register";
  };

  const handleToggleAction = () => {
    setAction((prev) => (isLogin(prev) ? "register" : "login"));
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
      await getProfile();
      if (action === "login") {
        const cats = await getCats();
        setCats(cats || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFullLoader(false);
      setIsActioning(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={isLoadingProfile} variant={variant}>
          {title(initialAction)}
        </Button>
      </DialogTrigger>
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

export default AuthButton;
