var queryParams = require('./queryParams');
function paginationParams (req, res, next) {
    if (req.query.records) {
        queryParams.setLimit(parseInt(req.query.records));
    }
    if (req.query.page) {
        queryParams.setOffset(parseInt(req.query.page));
    } else {
        queryParams.setOffset(parseInt(0));
    }
    next();
}
module.exports = paginationParams;
