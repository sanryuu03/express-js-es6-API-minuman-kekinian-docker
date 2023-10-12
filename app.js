import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import path from "path"
import { rootPath } from "./config/index.js"
import userRoutes from "./app/api/user/router.js"
import masterSizeRoutes from "./app/api/masterSize/router.js"
import masterProductRoutes from "./app/api/masterProduct/router.js"
import productPriceRoutes from "./app/api/productPrice/router.js"
import transactionsRoutes from "./app/api/transactions/router.js"
import authRoutes from "./app/api/auth/router.js"

dotenv.config()

const app = express()
const port = process.env.PORT ?? "3000"

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(rootPath, 'public')));
app.use(helmet())

app.get('/', (req, res) => {
    res.send(`express js es6 API minuman kekinian docker ⚡ server ${port}`)
})

const URL = `/api/v1`
app.use(`${URL}`, userRoutes);
app.use(`${URL}`, masterSizeRoutes);
app.use(`${URL}`, masterProductRoutes);
app.use(`${URL}`, productPriceRoutes);
app.use(`${URL}`, transactionsRoutes);
app.use(`${URL}`, authRoutes);

app.listen(port, () => console.log(`running ⚡ port: ${port}`))
