/**
 * If any part of app has set the status to 401, this will intercept and rewrite the response.
 * @param next
 */
module.exports = function *(next){
    try {
        yield next;
    } catch (err) {
        if (401 == err.status) {
            this.status = 401;
            this.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            //not something we can deal with
            throw err;
        }
    }
};