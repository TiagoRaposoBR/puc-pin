const dateFormat = require("dateformat");

class TelemetryObject {
    id;
    temperature;
    humidity;
    dateTime;

    constructor(source) {
        if (!source.id) {
            throw 'Dados do sensor não possuem id';
        }
        this.id = source.id;
        this.temperature = source.temperature;
        this.humidity = source.humidity;
        this.dateTime = dateFormat(source.dateTime, 'yyyy-mm-dd HH:MM:ss');
    }
}

module.exports = TelemetryObject;