import { FC } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "@/components/Link/Link.tsx";
import { FiHome, FiClock, FiBarChart2, FiUser } from "react-icons/fi";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const BottomNav: FC = () => {
  const location = useLocation();

  const items = [
    { id: "/", Icon: FiHome },
    { id: "/history", Icon: FiClock },
    { id: "/theme-params", Icon: FiBarChart2 },
    { id: "/settings", Icon: FiUser },
  ];

  return (
    <>
      {/* Градиентный фон под навбар */}
      <Box
        position="fixed"
        bottom="-1px"
        left="50%"
        transform="translateX(-50%)"
        w="100%"
        h="86px"
        bgGradient="to-t"
        gradientFrom="rgba(0,0,0,0.5)"
        gradientTo="rgba(0,0,0,0)"
        zIndex={999}
        pointerEvents="none"
      />

      {/* Сам навбар */}
      <motion.div
        initial={{ opacity: 1, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.38, ease: [0.22, 0.61, 0.36, 1] }}
        style={{
          position: "fixed",
          bottom: "8px",
          left: "18px",
          transform: "translateX(-50%)",
          width: "calc(100% - 36px)",
          maxWidth: "420px",
          zIndex: 1000,
        }}
      >
        <Flex
          as="nav"
          justify="space-around"
          align="center"
          py={1}
          bg="bottomBarBgAlpha"
          backdropFilter="blur(20px) saturate(180%)"
          backgroundImage="linear-gradient( 145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) )"
          boxShadow="inset 0 0 0 1px rgba(255,255,255,0.06)"
          borderRadius="2xl"
        >
          {items.map(({ id, Icon: IconComp }) => {
            const active = location.pathname === id;
            return (
              <Link key={id} to={id}>
                <Box
                  position="relative"
                  w="60px"
                  h="48px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {active && (
                    <motion.div
                      layoutId="nav-bubble"
                      style={{
                        position: "absolute",
                        top: 0,
                        width: "60px",
                        height: "48px",
                        borderRadius: "16px",

                        // Основной стеклянный фон
                        background: "rgba(255, 255, 255, 0.06)",
                        backdropFilter: "blur(20px) saturate(160%)",
                        WebkitBackdropFilter: "blur(20px) saturate(160%)",
                        // Лёгкий внутренний градиент (даёт глубину)
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
                        // Внешнее мягкое свечение
                        outline: "none",
                        // Градиентная подсветка сверху
                        backgroundImage:
                          "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  {/* Icon */}
                  <motion.div
                    style={{
                      position: "absolute",
                    }}
                    animate={{
                      scale: active ? 1.25 : 1,
                      opacity: active ? 1 : 0.7,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <Icon
                      boxSize={6}
                      m={1}
                      color={location.pathname === id ? "accentText" : "hint"}
                    >
                      {<IconComp />}
                    </Icon>
                  </motion.div>
                </Box>
              </Link>
            );
          })}
        </Flex>
      </motion.div>
    </>
  );
};
