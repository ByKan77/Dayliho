let express = require("express");
let cors = require("cors");
let app = express();

app.use(cors());
app.use(express.json());

// Import des routes
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');

// Utilisation des routes
app.use('/user', userRoutes);
app.use('/video', videoRoutes);

app.listen(1234, () => {
    console.log('Server running on port 1234');
});
