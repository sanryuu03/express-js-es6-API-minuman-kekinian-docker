import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"

dotenv.config()

const app = express()
const port = process.env.PORT ?? "3000"

app.use(express.json())
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  res.send(`express js es6 ⚡ server ${port}`)
})

app.listen(port, () => console.log(`running ⚡ port: ${port}`))