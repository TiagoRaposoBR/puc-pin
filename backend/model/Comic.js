
class Comic {
    releaseDate;
    title;
    issueNumber;
    group;
    universe;
    characters;

    constructor(releaseDate, title, issueNumber, group, universe, charactersList) {
        this.releaseDate = releaseDate;
        this.title = title;
        this.issueNumber = issueNumber;
        this.group = group;
        this.universe = universe;
        this.characters = charactersList;
    };
}

module.exports = Comic;