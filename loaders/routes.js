module.exports = function (app) {

    const helmet = require('helmet');
    const cors = require('cors');
    const error = require('../middleware/error');

    app.use(cors());
    app.use(helmet());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    //// Sets "X-Frame-Options: DENY".
    app.use(helmet.frameguard({
        action: 'deny'
    }))

    //// hides the x-powerd-by
    app.use(helmet.hidePoweredBy())


    var index = require('../routes/index')
    var user = require('../routes/user')


    app.use('/', index);
    app.use('/user', user);

    app.use(error);

    app.get('*', function (req, res) {
        res.redirect('/');
        return;
    });


    return app;
}