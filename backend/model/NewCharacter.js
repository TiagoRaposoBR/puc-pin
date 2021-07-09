
class NewCharacter {
    name;
    race;
    gender;
    creationDate;
    universeId;
    groups;

    constructor(name, race, gender, creationDate, universeId, groupsList) {
        this.name = name;
        this.race = race;
        this.gender = gender;
        this.creationDate = creationDate;
        this.universeId = universeId;
        this.groups = groupsList;
    };

    static parse(rawData) {
        if (rawData
            && rawData['name'] !== undefined
            && rawData['race'] !== undefined
            && rawData['gender'] !== undefined
            && rawData['creationDate'] !== undefined
            && rawData['universeId'] !== undefined
            && rawData['groups'] !== undefined
            && Array.isArray(rawData['groups'])) {
            return new NewCharacter(
                rawData['name'],
                rawData['race'],
                rawData['gender'],
                rawData['creationDate'],
                rawData['universeId'],
                rawData['groups']);
        } else {
            return null;
        }
    }
}

module.exports = NewCharacter;