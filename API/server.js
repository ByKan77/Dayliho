let questions = require('./question.json');
let express = require("express");
let app = express();
let cors = require("cors");
let pool = require('./database.js');

app.use(cors());
app.use(express.json()); // Seulement JSON

app.get("/getUser",async (req,res)=>{
   let conn = await pool.getConnection() // Si serveur en ligne, fonction async
   const rows = await conn.query("SELECT * FROM utilisateurs")
   console.log(rows)
   res.status(200).json(rows)
});

app.get("/getTaches",async (req,res)=>{
    let conn = await pool.getConnection() // Si serveur en ligne, fonction async
    const rows = await conn.query("SELECT * FROM taches")
    console.log(rows)
    res.status(200).json(rows)
 });

app.get("/questions",(req,res)=>{
    res.status(200).json(questions)
});

app.get("/question/:id",(req,res)=>{
    const id = req.params.id
    let laQuestion = questions.find(question => question.id === parseInt(id))
    res.status(200).json(laQuestion)
});

// Ajout
app.post("/question",(req,res)=>{
    let newQuestion = req.body
    questions.push(newQuestion)
    res.status(200).json(laQuestion)
});

app.listen(1234);