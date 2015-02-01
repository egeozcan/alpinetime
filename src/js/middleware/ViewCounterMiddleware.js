module.exports = function *(){
    var n = this.session.views || 0;
    this.session.views = ++n;
    this.body = n + ' views';
};