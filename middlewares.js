var models = require('./models');
module.exports = {
    url: function (req, res, next) {
        //console.log(req);
        res.locals.url = req.originalUrl;
        next();
    },
    user: function (req, res, next) {
        //console.log(req);
        if (req.user) {
            res.locals.user = req.user;
        }
        next();
    },
    userAuth: function (req, res, next) {
        if (!(req.user)) {
            console.log(req);
            res.redirect('/account/login?redirect=' + req.originalUrl);
        } else {
            next();
        }
    },
    adminAuth: function (req, res, next) {
        if (!(req.user)) {
            console.log(req);
            req.flash('info', '请先登录!');
            res.redirect('/account/login?redirect=' + req.originalUrl);
        } else if (req.user.permission == 0) {
            req.flash('info', '管理员才能访问噢!');
            res.redirect('/account/login?redirect=' + req.originalUrl);
        } else {
            next();
        }
    },
    initLink: function (req, res, next) {
        var newLink = function () {
            var links = [
                {
                    url: '/',
                    text: '首页'
                },
                {
                    url: '/books',
                    text: '书库博览'
                },
                {
                    url: '/recommend/history',
                    text: '读者荐购'
                },
                {
                    url: '/users',
                    text: '个人中心'
                }
            ];
            if (req.user && req.user.permission > 0) {
                links.push({
                    url: '/admin',
                    text: '后台管理'
                })
            }
            return links;
        };
        res.locals.links = newLink();
        next();
    },
    categoryList: function (req, res, next) {
        models.Category
            .collection()
            .fetch()
            .then(function(allCategories) {
                res.locals.categories = allCategories.toJSON()
                next();
            });
    }
}