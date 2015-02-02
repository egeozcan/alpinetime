/**
 * If any part of app has set the status to 401, this will intercept and rewrite the response.
 * @param next
 */
module.exports = function *(next){
    try {
        yield next;
    } catch (err) {
        if (err.status === 401) {
            this.status = 401;
            this.body = 'You don\'t have permission to access this resource.';
        } else {
            throw err;
        }
    }
};