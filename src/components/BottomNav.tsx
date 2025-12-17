import { FC } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "@/components/Link/Link.tsx";
import { FiHome, FiClock, FiBarChart2, FiUser } from "react-icons/fi";

export const BottomNav: FC = () => {
  const location = useLocation();

  const items = [
    { id: "/", Icon: FiHome },
    { id: "/init-data", Icon: FiClock },
    { id: "/launch-params", Icon: FiBarChart2 },
    { id: "/theme-params", Icon: FiUser },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "calc(100% - 24px)",
        maxWidth: "420px",
        padding: "8px 0",
        backgroundColor: "rgba(var(--tg-theme-bg-color), 0.15)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blue(12px)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255, 0.15)",
        boxShadow: "0 0 24px 12px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      {items.map(({ id, Icon }) => (
        <Link
          key={id}
          to={id}
          className="nav-link"
        >
          <Icon
            size={22}
            color={
              location.pathname === id
                ? "var(--tg-theme-button-color)"
                : "var(--tg-theme-text-color)"
            }
          />
        </Link>
      ))}
    </nav>
  );
};
