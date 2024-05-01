"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { Login } from "@/schema/login.schema";
import * as authService from "@/services/auth";
import { Register } from "@/schema/register.schema";
import {
  $isLoadingProfile,
  setIsLoadingProfile,
  setProfile,
} from "@/store/profile";
import { setFullLoader } from "@/store/full-loader";
import { useStore } from "@nanostores/react";
import { useProfile } from "@/hooks/useProfile";

const AuthButton = ({
  initialAction,
}: {
  initialAction: "login" | "register";
}) => {
  const { getProfile } = useProfile();

  const isLoadingProfile = useStore($isLoadingProfile);

  const [action, setAction] = useState(initialAction);
  const [isActioning, setIsActioning] = useState(false);

  const [open, setOpen] = useState(false);

  const isLogin = (action: typeof initialAction) => action === "login";

  const title = (action: typeof initialAction, inverse: boolean = false) => {
    if (inverse) {
      return isLogin(action) ? "Register" : "Login";
    }
    return isLogin(action) ? "Login" : "Register";
  };

  const handleToggleAction = () => {
    setAction((prev) => (isLogin(prev) ? "register" : "login"));
  };

  const onSubmit = async (values: Login | Register) => {
    try {
      setFullLoader(true);
      setIsActioning(true);
      const response = await authService.auth(action, values);
      const { accessToken, refreshToken } = response.data.data!;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setOpen(false);
      await getProfile();
    } catch (error) {
      console.error(error);
    } finally {
      setIsActioning(false);
      setFullLoader(false);
    }

    // try {
    //   setIsLoadingProfile(true);
    //   const data = await authService.getProfile();
    //   setProfile(data);
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setIsLoadingProfile(false);
    // }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isLoadingProfile}
          className="w-full"
          variant={isLogin(initialAction) ? "outline" : "default"}
        >
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
