import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from 'url';

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const rootPath = path.resolve(__dirname, '..')

export const jwtKeyAccess= process.env.ACCESS_TOKEN_SECRECT
export const jwtKeyRefresh= process.env.REFRESH_TOKEN_SECRECT
