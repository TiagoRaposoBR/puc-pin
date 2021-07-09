
class SensorObject {
    id;
    latitude;
    longitude;

    constructor(id, latitude, longitude) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    static parse(rawData) {
        if (rawData && rawData['id'] !== undefined
            && rawData['latitude'] !== undefined
            && rawData['longitude'] !== undefined) {
            return new SensorObject(rawData.id, rawData.latitude, rawData.longitude);
        } else {
            return null;
        }
    }
}

module.exports = SensorObject;