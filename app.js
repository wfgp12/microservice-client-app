const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola mundo desde mi servicio en Node.js!');
});

// Manejador para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});