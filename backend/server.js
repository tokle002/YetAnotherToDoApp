const express = require("express");
const cors = require("cors"); // Importiere das CORS-Paket
const todoRoutes = require("./routes/todoRoutes"); // Deine Routen

const app = express();
const PORT = 3000;

// Verwende CORS
app.use(cors());

// Middleware für JSON
app.use(express.json());

// Verwende die Todo-Routen
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
