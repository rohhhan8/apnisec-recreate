import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow 'any' type - common in dynamic handlers and API responses
      "@typescript-eslint/no-explicit-any": "off",
      
      // Allow unused vars with underscore prefix (common pattern for destructuring)
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      
      // Allow @ts-nocheck for third-party components
      "@typescript-eslint/ban-ts-comment": "off",
      
      // Downgrade unescaped entities to warning
      "react/no-unescaped-entities": "warn",
      
      // Allow missing deps in useEffect (intentional in some cases)
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
