const pool = require("./db.js");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint para crear tabla (como ya tenías)
app.post("/create-data-table", async (req, res) => {
  try {
    const tableName = "data";

    const checkTable = await pool.query("SELECT to_regclass($1) AS exists", [
      tableName,
    ]);

    if (!checkTable.rows[0].exists) {
      await pool.query(`
        CREATE TABLE data (
          id SERIAL PRIMARY KEY,
          value TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      return res.status(201).json({ message: "✅ Tabla creada exitosamente" });
    } else {
      return res.status(200).json({ message: "ℹ️ La tabla ya existe" });
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

// Endpoint para temperatura (como ya tenías)
app.get("/temperatura", (req, res) => {
  res.json({ valor: "10 °C", timestamp: new Date().toISOString() });
});

// Nuevos endpoints para controlar el relay
app.post("/relay/on", (req, res) => {
  // Aquí iría la lógica para encender el relay
  res.status(200).json({ status: "ON", message: "Relay encendido" });
});

app.post("/relay/off", (req, res) => {
  // Aquí iría la lógica para apagar el relay
  res.status(200).json({ status: "OFF", message: "Relay apagado" });
});

app.get("/relay/status", (req, res) => {
  // Aquí iría la lógica para obtener el estado
  res
    .status(200)
    .json({ status: "ON/OFF", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
