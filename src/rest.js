const Koa = require('koa');

var doRunServer = function() {

    const app = new Koa();

    app.use(ctx => {
      ctx.body = 'Hello World';
    });

    app.listen(3001);
};

module.exports = {
    runServer: function () {
        doRunServer(); 
    }
};