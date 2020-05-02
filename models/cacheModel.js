const NodeCache = require('node-cache');

class Cache {

    constructor(ttlSeconds=0) {
        this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds***REMOVED*** 0.2, useClones: false ***REMOVED***);
  ***REMOVED***

    get(key, storeFunction) {
        const value = this.cache.get(key);
        if (value !== undefined) {
            return Promise.resolve(value);
      ***REMOVED***

        return storeFunction().then((result) => {
            this.cache.set(key, result);
            return result;
      ***REMOVED***);
  ***REMOVED***

    del(keys) {
        this.cache.del(keys);
  ***REMOVED***

    delStartWith(startStr = '') {
        if (!startStr) {
            return;
      ***REMOVED***

        const keys = this.cache.keys();
        for (const key of keys) {
            if (key.indexOf(startStr) === 0) {
                this.del(key);
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***

    flush() {
        this.cache.flushAll();
  ***REMOVED***
***REMOVED***


module.exports = Cache;