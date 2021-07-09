
class NewUser {
    name;
    i_am_above_13;

    constructor(n, i13) {
        this.name = n;
        this.i_am_above_13 = i13;
    };

    static parse(rawData) {
        if (rawData && rawData['name'] !== undefined && rawData['i_am_above_13'] !== undefined) {
            return new NewUser(rawData.name, rawData.i_am_above_13);
        } else {
            return null;
        }
    }
}

module.exports = NewUser;