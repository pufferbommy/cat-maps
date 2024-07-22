import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import AuthDialog from "./auth-dialog";
import { DialogTrigger } from "../ui/dialog";
import { forwardRef, useImperativeHandle, useState } from "react";

interface LoginRequiredAlertDialogProps {
  description?: string;
}

export interface LoginRequiredAlertDialogHandle {
  open: () => void;
}

const LoginRequiredAlertDialog = forwardRef<
  LoginRequiredAlertDialogHandle,
  LoginRequiredAlertDialogProps
>(({ description }, ref) => {
  const [isOpen, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  return (
    <AuthDialog
      initialAction="login"
      trigger={
        <AlertDialog open={isOpen} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Login Required</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <DialogTrigger asChild>
                  <Button>Log in</Button>
                </DialogTrigger>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
    />
  );
});
LoginRequiredAlertDialog.displayName = "LoginRequiredAlertDialog";

export default LoginRequiredAlertDialog;
