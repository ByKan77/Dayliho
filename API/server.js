let express = require("express");
let app = express();
let cors = require("cors");
let pool = require('./database.js');

app.use(cors());
app.use(express.json()); // Seulement JSON

app.get("/getUser",async (req,res)=>{
   let conn = await pool.getConnection() // Si serveur en ligne, fonction async
   const rows = await conn.query("SELECT * FROM utilisateur")
    // console.log(rows)
   res.status(200).json(rows)
});

app.get("/getVideos",async (req,res)=>{
    let conn = await pool.getConnection() 
    const rows = await conn.query("SELECT * FROM video")
    // console.log(rows)
    res.status(200).json(rows)
});

app.listen(1234);