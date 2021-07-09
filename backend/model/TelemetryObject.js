class TelemetryObject {
    sensorId;
    temperature;
    humidity;
    date_time;

    constructor(sensorId, temperature, humidity, date_time) {
        this.sensorId = sensorId;
        this.temperature = temperature;
        this.humidity = humidity;
        this.date_time = date_time;
    }

    static parse(rawData) {
        if (rawData && rawData['sensor_id'] !== undefined
            && rawData['temperature'] !== undefined
            && rawData['humidity'] !== undefined
            && rawData['date_time'] !== undefined) {
            return new TelemetryObject(rawData.sensor_id, rawData.temperature, rawData.humidity, rawData.date_time);
        } else {
            return null;
        }
    }
}

module.exports = TelemetryObject;