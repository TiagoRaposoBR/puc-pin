const auth = require('./security/auth');

const sensor = require('./routes/sensorRoute');
const telemetry = require('./routes/telemetryRoute');

const express = require('express');
const port = 3000;
const app = express();

app.set('trust proxy', true);
app.use(express.json());

/********************** SENSOR ***************************/
app.post('/api/v1/sensors', auth.isAdmin, (req, res) => {
    sensor.createSensor(req, res);
})

// app.get('/api/v1/token', (req, res) => {
//     sensor.getToken(req, res);
// })

/********************** DADOS *************************/
app.post('/api/v1/telemetry/', auth.isAuthorized, (req, res) => {
    telemetry.addTelemetryData(req, res);
})

//--------------------- INIT ------------------------------
app.listen(port, () => {
    console.log(`Serviço iniciado na porta ${port}`);
})