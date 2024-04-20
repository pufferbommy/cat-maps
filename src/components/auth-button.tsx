"use client";

import { toast } from "sonner";
import { useState } from "react";

import {
  Dialog,
  DialogClose,
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
import { Register } from "@/schema/register.schema";

const AuthButton = ({
  initialAction,
}: {
  initialAction: "login" | "register";
}) => {
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

  const onSubmit = (values: Login | Register) => {
    const url = `/api/auth/${action}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then(async (response) => {
        const result: BaseResponse<AuthResponseData> = await response.json();
        if (!result.success) throw new Error(result.message);
        localStorage.setItem("accessToken", result.data!.accessToken);
        localStorage.setItem("refreshToken", result.data!.refreshToken);
        setOpen(false);
        toast.success(result.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
