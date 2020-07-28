require('dotenv').config()
const express = require('express')
const app = express()

const db = require('./database')

app.use(express.json())

app.use("/", express.static('./public'))

app.get("/feedback", async (req, res)=>{
    try{
        let sql = 'select name, feedback, createdAt from feedback order by id desc'
        let result = await db.get(sql)
        res.status(200).json({ data: result })
    }catch(err){
        res.status(500).json({error: "Internal Server Error", actulErr: err})
    }
})

app.post("/feedback", async (req, res)=>{
    try{
        console.log(req.body)
        let { name, feedback } = req.body
        let sql = 'insert into feedback(name, feedback) values(?,?)'
        let result = await db.run(sql, [name, feedback])
        res.status(200).json({ data: result })
    }catch(err){
        console.log(err)
        res.status(500).json({error: "Internal Server Error", actulErr: err})
    }
})

app.listen(process.env.PORT, ()=>{
    console.log("Listening on Port : ", process.env.PORT)
})