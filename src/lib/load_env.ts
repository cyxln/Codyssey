import("server-only").catch(() => {
  // Ignore when running outside Next.js (e.g., Netlify Functions).
});
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

const root = process.cwd();
const nodeEnv = process.env.NODE_ENV ?? "development";
const envFiles = [
  ".env",
  ".env.local",
  `.env.${nodeEnv}`,
  `.env.${nodeEnv}.local`,
];

for (const envFile of envFiles) {
  const envPath = path.join(root, envFile);
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: true });
  }
}
