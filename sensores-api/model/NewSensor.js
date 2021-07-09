
class NewSensor {
    latitude;
    longitude;

    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    };

    static parse(rawData) {
        if (rawData && rawData['latitude'] !== undefined && rawData['longitude'] !== undefined) {
            return new NewSensor(rawData.latitude, rawData.longitude);
        } else {
            return null;
        }
    }
}

module.exports = NewSensor;