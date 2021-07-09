const auth = require('./security/auth');
const checkLimit = require('./middleware/connectionLimit');
const cacheInHeader = require('./middleware/cacheHeader');
const checkCache = require('./middleware/cacheRequests').check;

const users = require('./routes/usersRoute');
const sensors = require('./routes/sensorsRoute');
const telemetry = require('./routes/telemetryRoute');

const express = require('express');
const port = 3000;
const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(checkLimit);

/********************** USERS ***************************/
app.post('/api/v1/users', (req, res) => {
    users.createUser(req, res);
})

app.post('/api/v1/token', (req, res) => {
    users.getToken(req, res);
})

app.get('/api/v1/', auth.isAuthorized, cacheInHeader, checkCache, (req, res) => {
    res.send('Hello World!')
})

/********************** SENSORS *************************/
app.get('/api/v1/sensors/', auth.isAuthorized, cacheInHeader, checkCache, (req, res) => {
    sensors.listSensors(req, res);
})

app.get('/api/v1/sensors/:id', auth.isAuthorized, cacheInHeader, checkCache, (req, res) => {
    sensors.getSensor(req, res);
})

/********************** TELEMETRY *************************/
app.get('/api/v1/telemetry/', auth.isAuthorized, cacheInHeader, checkCache, (req, res) => {
    telemetry.listTelemetry(req, res);
})

/********************** ADMIN ****************************/
// app.post('/api/v1/sensors', auth.isAdmin, (req, res) => {
//     sensors.createSensors(req, res);
// })

//--------------------- INIT ------------------------------
app.listen(port, () => {
    console.log(`Serviço iniciado na porta ${port}`);
})