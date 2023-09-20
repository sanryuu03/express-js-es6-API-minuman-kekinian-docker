import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import userRoutes from "./app/api/user/router.js"

dotenv.config()

const app = express()
const port = process.env.PORT ?? "3000"

app.use(express.json())
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
    res.send(`express js es6 API minuman kekinian docker ⚡ server ${port}`)
})

const URL = `/api/v1`
app.use(`${URL}`, userRoutes);

app.listen(port, () => console.log(`running ⚡ port: ${port}`))
