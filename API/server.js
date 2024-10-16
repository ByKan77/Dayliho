let express = require("express");
let app = express();
let cors = require("cors");
let pool = require('./database.js');

app.use(cors());
app.use(express.json()); // Seulement JSON

app.post("/checkUser", async (req, res) => {
    const { email, mot_de_passe } = req.body;

    try {
        let conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM utilisateur WHERE email = ?", [email]);
        const utilisateur = rows[0]; // Supposons que l'email soit unique

        if (utilisateur && utilisateur.mot_de_passe === mot_de_passe) {
            // Si l'utilisateur existe et que le mot de passe est correct
            res.status(200).json({ success: true, user_id: utilisateur.id });
        } else {
            // Si l'utilisateur n'est pas trouvé ou que le mot de passe est incorrect
            res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
        }

        conn.release();
    } catch (error) {
        console.error("Erreur lors de la vérification des informations utilisateur:", error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
});

app.get("/getUser",async (req,res)=>{
    let conn = await pool.getConnection() // Si serveur en ligne, fonction async
    const rows = await conn.query("SELECT * FROM utilisateur")
     // console.log(rows)
     conn.release();
    res.status(200).json(rows)
 });

app.get("/getVideos",async (req,res)=>{
    let conn = await pool.getConnection() 
    const rows = await conn.query("SELECT * FROM video")
    // console.log(rows)
    conn.release();

    res.status(200).json(rows)
});

app.listen(1234);