
class TokenData {
    id;
    token;
    expires;

    constructor(id, token, expires) {
        this.id = id;
        this.token = token;
        this.expires = expires
    }

    static parse(rawData) {
        if (rawData && rawData['id'] !== undefined && rawData['token'] !== undefined && rawData['expires'] !== undefined) {
            return new TokenData(rawData.id, rawData.token, rawData.expires);
        } else {
            return null;
        }
    }
}

module.exports = TokenData;