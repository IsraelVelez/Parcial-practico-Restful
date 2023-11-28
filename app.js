const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Base de datos de ejemplo para almacenar las notas
const estudiantes = {
    "123456789": {"nombre": "Juan Perez", "notas": {"Matematicas": 90, "Ciencias": 85, "Historia": 78}}
};

// Método GET para consultar las notas de un estudiante por su cédula
app.get('/estudiante/:cedula', (req, res) => {
    const cedula = req.params.cedula;
    if (cedula in estudiantes) {
        res.json(estudiantes[cedula].notas);
    } else {
        res.status(404).json({ error: "Estudiante no encontrado" });
    }
});

// Método POST para ingresar información de notas por materia de un estudiante
app.post('/estudiante', (req, res) => {
    const datos = req.body;

    // Verificar si se proporcionan los datos necesarios
    if (!datos.cedula || !datos.nombre || !datos.notas) {
        return res.status(400).json({ error: "Datos incompletos" });
    }

    const cedula = datos.cedula;

    // Verificar si el estudiante ya existe en la base de datos
    if (cedula in estudiantes) {
        return res.status(400).json({ error: "El estudiante ya existe" });
    } else {
        estudiantes[cedula] = { nombre: datos.nombre, notas: datos.notas };
        return res.status(201).json({ mensaje: "Estudiante registrado exitosamente" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
