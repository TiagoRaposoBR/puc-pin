const moment = require("moment");

const cache = {};

const maxCacheEntries = 10;
const oldestCachesToRemove = 5;
const expireCount = 12;
const expireUnit = 'minutes';

module.exports.check = function (req, res, next) {
    const key = req.originalUrl;
    const data = cache[key];

    if (data) {
        if (moment().isAfter(moment(data.expires))) {
            delete cache[key];
            next();
        } else {
            res.status(200).json(data.content);
        }
    } else {
        next();
    }
}

/** Adiciona uma entrada ao cache.
 *  Se o cache tiver 100 ou mais entradas, remove as 10 mais antigas */
module.exports.add = function(req, content) {
    const allKeys = Object.keys(cache);
    if (allKeys.length >= maxCacheEntries) {
        const sortedCache = [];

        allKeys.forEach(k => {
            sortedCache.push({
                key: k,
                expires: cache[k].expires
            });
        })
        sortedCache.sort((a, b) => moment(a.expires).diff(moment(b.expires)));

        for (let i = 0; i < oldestCachesToRemove; i++) {
            delete(cache[sortedCache[i].key]);
        }
    }

    const key = req.originalUrl;
    cache[key] = {
        content: content,
        expires: moment().add(expireCount, expireUnit).toISOString()
    };
}