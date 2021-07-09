
class UserCredentials {
    email;
    pass_word;

    constructor(email, pass_word) {
        this.email = email;
        this.pass_word = pass_word;
    }

    static parse(rawData) {
        if (rawData && rawData['email'] !== undefined && rawData['password'] !== undefined) {
            return new UserCredentials(rawData.email, rawData.password);
        } else {
            return null;
        }
    }
}

module.exports = UserCredentials;