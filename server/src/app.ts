import express from 'express'
import { getDocs } from './auxiliaries/extract.js'
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/get_math_colles', (req, res) => {
    getDocs().then((result) => {
        res.send({success:true, body:result})
    })
})

export default app