import Avatar from "boring-avatars";
import { useStore } from "@nanostores/react";

import AuthButton from "./auth-button";
import LogoutButton from "./logout-button";
import { $isLoadingProfile, $profile } from "@/store/profile";

const greetings = [
  "A warm welcome",
  "Hello",
  "Welcome back",
  "Greetings",
  "Hey there",
  "Nice to have you here",
  "Warm greetings",
  "Hi",
];

const encouragements = [
  "Let's make it a great day",
  "I hope you're having a wonderful day",
  "How's everything going today?",
  "It's great to see you again",
  "Keep pushing forward",
];

const Navbar = () => {
  const profile = useStore($profile);
  const isLoadingProfile = useStore($isLoadingProfile);

  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  const encouragement =
    encouragements[Math.floor(Math.random() * encouragements.length)];

  return (
    <div className="p-4 shadow">
      {!isLoadingProfile ? (
        <>
          {!profile ? (
            <div className="flex items-center justify-between">
              <p>Welcome onboard! 👋</p>
              <div className="flex gap-2">
                <AuthButton initialAction="login" />
                <AuthButton initialAction="register" />
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <div className="flex items-center gap-2 w-full">
                <Avatar variant="beam" size={40} name={profile?.username} />
                <p className="truncate w-full">
                  {greeting},{" "}
                  <span className="capitalize">{profile?.username}!</span>
                  <span className="text-muted-foreground ml-2">
                    {encouragement}
                  </span>
                </p>
              </div>
              <LogoutButton />
            </div>
          )}
        </>
      ) : (
        <p className="h-10 flex items-center">Loading...</p>
      )}
    </div>
  );
};

export default Navbar;
