var DEFAULT_LIMIT = 25;
var DEFAULT_OFFSET = 0;
module.exports = {
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    setLimit: function (giveLimit) {
        this.limit = giveLimit;
    },
    getLimit: function () {
        return this.limit;
    },
    setOffset: function (givenOffset) {
        this.offset = givenOffset;
    },
    getOffset: function () {
        return this.offset;
    }
};
