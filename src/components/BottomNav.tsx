import { FC } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "@/components/Link/Link.tsx";
import { FiHome, FiClock, FiBarChart2, FiUser } from "react-icons/fi";
import { Box, Flex, Icon } from "@chakra-ui/react";

export const BottomNav: FC = () => {
  const location = useLocation();

  const items = [
    { id: "/", Icon: FiHome },
    { id: "/init-data", Icon: FiClock },
    { id: "/launch-params", Icon: FiBarChart2 },
    { id: "/theme-params", Icon: FiUser },
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
      <Flex
        as="nav"
        position="fixed"
        bottom="8px"
        left="50%"
        transform="translateX(-50%)"
        justify="space-around"
        align="center"
        w="calc(100% - 36px)"
        maxW="420px"
        py={2}
        bg="sectionBg" // цвет из твоей темы Chakra
        borderRadius="2xl"
        border="1px solid rgba(255,255,255,0.15)"
        zIndex={1000}
      >
        {items.map(({ id, Icon: IconComp }) => (
          <Link key={id} to={id}>
            <Icon
              boxSize={6}
              m={1}
              color={location.pathname === id ? "accentText" : "hint"}
            >
              {<IconComp />}
            </Icon>
          </Link>
        ))}
      </Flex>
    </>
  );
};
