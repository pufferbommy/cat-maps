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
import axios from "@/lib/axios";
import { Button } from "./ui/button";
import LoginForm from "./login-form";
import { useAuth } from "@/hooks/useAuth";
import RegisterForm from "./register-form";
import { Login } from "@/schema/login.schema";
import { Register } from "@/schema/register.schema";

const AuthButton = ({
  initialAction,
}: {
  initialAction: "login" | "register";
}) => {
  const { getProfile } = useAuth();

  const [action, setAction] = useState(initialAction);

  const [open, setOpen] = useState(false);

  const isLogin = (action: typeof initialAction) => action === "login";

  const title = (action: typeof initialAction, inverse: boolean = false) => {
    if (inverse) {
      return isLogin(action) ? "สมัครสมาชิก" : "เข้าสู่ระบบ";
    }
    return isLogin(action) ? "เข้าสู่ระบบ" : "สมัครสมาชิก";
  };

  const handleToggleAction = () => {
    setAction((prev) => (isLogin(prev) ? "register" : "login"));
  };

  const onSubmit = async (values: Login | Register) => {
    const url = `auth/${action}`;
    const response = await axios.post<BaseResponse<Auth>>(url, values);
    const { accessToken, refreshToken } = response.data.data!;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setOpen(false);
    getProfile();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
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
          <LoginForm onSubmit={onSubmit} />
        ) : (
          <RegisterForm onSubmit={onSubmit} />
        )}
        <DialogFooter>
          <div className="flex items-center gap-2 text-sm justify-center">
            <p className="text-muted-foreground">
              {isLogin(action) ? "ยังไม่มีบัญชี?" : "มีบัญชีแล้ว?"}
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
