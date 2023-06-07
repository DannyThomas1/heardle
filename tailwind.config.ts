import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  typeRoots: ["src/types", "node_modules/@types"],
  plugins: [],
} satisfies Config;
