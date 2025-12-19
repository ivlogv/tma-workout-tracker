import { useNavigate } from "react-router-dom";
import { backButton } from "@tma.js/sdk-react";
import { type PropsWithChildren, useEffect } from "react";
import { BottomNav } from "@/components/BottomNav.tsx";

export function Page({
  children,
  back = true,
  showNav = true,
}: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   */
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
        paddingBottom: showNav ? "64px" : "0",
        paddingLeft: "12px",
        paddingRight: "12px",
      }}
    >
      {children}
      {showNav && <BottomNav />}
    </div>
  );
}
