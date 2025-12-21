import { useNavigate } from "react-router-dom";
import { backButton } from "@tma.js/sdk-react";
import { type PropsWithChildren, useEffect } from "react";
import { BottomNav } from "@/components/BottomNav.tsx";

export function Page({
  children,
  back = true,
  showNav = true,
}: PropsWithChildren<{
  back?: boolean;
  showNav?: boolean;
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      backButton.show();
      return backButton.onClick(() => {
        navigate(-1);
      });
    }
    backButton.hide();
  }, [back]);

  return (
    <div
      style={{
        paddingBottom: showNav ? "72px" : "0",
      }}
    >
      {children}
      {showNav && <BottomNav />}
    </div>
  );
}
