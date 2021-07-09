
class NewComic {
    releaseDate;
    title;
    issueNumber;
    groupId;
    universeId;
    characters;

    constructor(releaseDate, title, issueNumber, groupId, universeId, charactersList) {
        this.releaseDate = releaseDate;
        this.title = title;
        this.issueNumber = issueNumber;
        this.groupId = groupId;
        this.universeId = universeId;
        this.characters = charactersList;
    };

    static parse(rawData) {
        if (rawData
            && rawData['releaseDate'] !== undefined
            && rawData['title'] !== undefined
            && rawData['issueNumber'] !== undefined
            && rawData['groupId'] !== undefined
            && rawData['universeId'] !== undefined
            && rawData['characters'] !== undefined
            && Array.isArray(rawData['characters'])) {
            return new NewComic(
                rawData['releaseDate'],
                rawData['title'],
                rawData['issueNumber'],
                rawData['groupId'],
                rawData['universeId'],
                rawData['characters']);
        } else {
            return null;
        }
    }
}

module.exports = NewComic;