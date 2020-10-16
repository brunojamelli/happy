import express from 'express';
import './database/connection';

const app = express();

app.listen(3333);

app.get("/users", (req, res) => { 
    console.log("aaa");
    res.status(200).send({
        msg: "aijkaijajia"
    })
})
