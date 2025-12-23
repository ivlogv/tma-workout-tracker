import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";

const buttonRecipe = defineRecipe({
  base: {
    borderRadius: "md",
    fontWeight: "semibold",
    px: 4,
    py: 2,
    transition: "all 0.2s",
    _hover: { opacity: 0.9 },
    _active: { opacity: 0.9 },
  },
  variants: {
    variant: {
      telegram: {
        bg: "{colors.button}",
        color: "{colors.buttonText}",
      },
      destructive: {
        bg: "{colors.secondaryBg}",
        color: "{colors.destructiveText}",
        outlineColor: "{colors.sectionSeparator}",
        _hover: { opacity: 0.95 },
      },
    },
  },
  defaultVariants: { variant: "telegram" },
});

const iconButtonRecipe = defineRecipe({
  base: {
    bg: "bottomBarBg",
    color: "hint", // светло-серый/средне-серый цвет для иконок
    borderRadius: "full",
    transition: "all 0.2s",
    _hover: { transform: "scale(1.1)" },
  },
  variants: {
    state: {
      default: {
        color: "hint",
      },
      active: {
        color: "accentText", // акцентный цвет из темы Telegram
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
});

const headingRecipe = defineRecipe({
  base: {
    fontWeight: "bold",
    color: "sectionHeaderText",
  },
});

const codeRecipe = defineRecipe({
  base: {
    bg: "secondaryBg",
    color: "accentText",
    p: 2,
    borderRadius: "md",
  },
});

const boxRecipe = defineRecipe({
  base: {
    bg: "secondaryBg",
    color: "text",
    borderColor: "sectionSeparator",
    borderWidth: "1px",
    borderRadius: "md",
    p: 4,
  },
});

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        telegramBg: { value: "var(--tg-theme-bg-color)" },
        telegramBgAlpha: { value: "rgba(var(--tg-theme-bg-color-rgb), 0.8)" },
        telegramText: { value: "var(--tg-theme-text-color)" },
        telegramHint: { value: "var(--tg-theme-hint-color)" },
        telegramLink: { value: "var(--tg-theme-link-color)" },
        telegramButton: { value: "var(--tg-theme-button-color)" },
        telegramButtonText: { value: "var(--tg-theme-button-text-color)" },
        telegramAccentText: { value: "var(--tg-theme-accent-text-color)" },
        telegramDestructiveText: {
          value: "var(--tg-theme-destructive-text-color)",
        },
        telegramHeaderBg: { value: "var(--tg-theme-header-bg-color)" },
        telegramHeaderBgAlpha: {
          value: "rgba(var(--tg-theme-header-bg-color-rgb), 0.85)",
        },
        telegramSecondaryBg: { value: "var(--tg-theme-secondary-bg-color)" },
        telegramSecondaryBgAlpha: {
          value: "rgba(var(--tg-theme-secondary-bg-color-rgb), 0.7)",
        },
        telegramSectionBg: { value: "var(--tg-theme-section-bg-color)" },
        telegramSectionBgAlpha: {
          value: "rgba(var(--tg-theme-section-bg-color-rgb), 0.7)",
        },
        telegramSectionHeaderText: {
          value: "var(--tg-theme-section-header-text-color)",
        },
        telegramSectionSeparator: {
          value: "var(--tg-theme-section-separator-color)",
        },
        telegramSubtitleText: { value: "var(--tg-theme-subtitle-text-color)" },
        telegramBottomBarBg: { value: "var(--tg-theme-bottom-bar-bg-color)" },
        telegramBottomBarBgAlpha: {
          value: "rgba(var(--tg-theme-bottom-bar-bg-color-rgb), 0.85)",
        },
        gradientOverlay: {
          _light: {
            value:
              "linear-gradient(to top, rgba(255,255,255,0.8), transparent)",
          },
          _dark: {
            value: "linear-gradient(to top, rgba(0,0,0,0.25), transparent)",
          },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: { value: "{colors.telegramBg}" },
        bgAlpha: { value: "{colors.telegramBgAlpha}" },
        text: { value: "{colors.telegramText}" },
        hint: { value: "{colors.telegramHint}" },
        link: { value: "{colors.telegramLink}" },
        button: { value: "{colors.telegramButton}" },
        buttonText: { value: "{colors.telegramButtonText}" },
        accentText: { value: "{colors.telegramAccentText}" },
        destructiveText: { value: "{colors.telegramDestructiveText}" },
        headerBg: { value: "{colors.telegramHeaderBg}" },
        headerBgAlpha: { value: "{colors.telegramHeaderBgAlpha}" },
        secondaryBg: { value: "{colors.telegramSecondaryBg}" },
        secondaryBgAlpha: { value: "{colors.telegramSecondaryBgAlpha}" },
        sectionBg: { value: "{colors.telegramSectionBg}" },
        sectionBgAlpha: { value: "{colors.telegramSectionBgAlpha}" },
        sectionHeaderText: { value: "{colors.telegramSectionHeaderText}" },
        sectionSeparator: { value: "{colors.telegramSectionSeparator}" },
        subtitleText: { value: "{colors.telegramSubtitleText}" },
        bottomBarBg: { value: "{colors.telegramBottomBarBg}" },
        bottomBarBgAlpha: { value: "{colors.telegramBottomBarBgAlpha}" },
      },
      shadows: {
        navShadow: {
          _light: { value: "0 -4px 12px rgba(0,0,0,0.15)" },
          _dark: { value: "0 -6px 16px rgba(0,0,0,0.5)" },
        },
        navDropShadow: {
          _light: { value: "drop-shadow(0 -4px 12px rgba(0,0,0,0.15))" },
          _dark: { value: "drop-shadow(0 -6px 16px rgba(0,0,0,0.45))" },
        },
      }
    },
    recipes: {
      button: buttonRecipe,
      iconButton: iconButtonRecipe,
      heading: headingRecipe,
      code: codeRecipe,
      box: boxRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, config);
