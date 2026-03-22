import express from 'express'
import { getDocs, getImptDocs } from './auxiliaries/extract.js'
import cors from 'cors'
const app = express()
const port = process.env.PORT

app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/get_docs', (req, res) => {
    getDocs().then((result) => {
        res.send({success:true, body:result})
    })
})

app.get('/get_impt_docs', (req, res) => {
    getImptDocs().then((result) => {
        res.send({success:true, body:result})
    })
})

export default app