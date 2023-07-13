import type { Config } from "tailwindcss";
import { withShurikenUI } from "@shuriken-ui/tailwind";
import colors from "tailwindcss/colors";

export default <Partial<Config>>withShurikenUI({
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
        muted: colors.slate,
        info: colors.sky,
        success: colors.teal,
        danger: colors.rose,
        warning: colors.amber,
      },
    },
  },
});
