var express = require('express');
var router = express.Router();
var models = require('../models');
var middlewares = require('../middlewares');

//router.get('/', function(req, res, next) {
//    //res.send('there are books.');
//    res.render('books', {
//
//    });
//
//
//
//});

router.get('/:id(\\d+)/', middlewares.categoryList ,function (req, res) {
    models.Book
        .where({
            id: req.params.id
        })
        .fetch()
        .then(function (book) {
            if (book) {
                res.render('books/detail', {
                    book: book.toJSON()
                });
            } else {
                req.flash('error', '没有这本书!');
                res.render('books/detail', {
                });
            }

        })


});

router.get('/:category([A-Z]?)', function (req, res, next) {

    var fetchAllCategory = models.Category
        .collection()
        .fetch();
    var promiseArray = [fetchAllCategory];
    if (req.params.category) {
        var fetchCategory = models.Category
            .where({char: req.params.category})
            .fetch();
        promiseArray.push(fetchCategory);
    }
    ;

    Promise.all(promiseArray)
        .then(function (data) {
            var allCategories = data[0];

            var category = data[1];
            console.log(category);
            /**
             * If category exists, directly render the page.
             * Otherwise, show error message.
             */
            var where = {}
            if (req.params.category) {
                where = {
                    category_char: category.get('char')
                }
            }
            if (!req.params.category || category) {
                models.Book
                    .where(where)
                    .fetchAll()
                    .then(function (books) {
                        var data = books.toJSON();
                        //console.log(books.toJSON());
                        var count = data.length;
                        var pageSize = 20;
                        var pageNumber = (req.query.page) ? parseInt(req.query.page) : 1;

                        var pages = [];
                        var totalPageNumber = Math.floor(parseInt(count - 1) / parseInt(pageSize)) + 1;
                        if (pageNumber > pageSize) pageNumber = pageSize;
                        if (pageNumber < 1) pageNumber = 1;
                        var i, j
                        console.log('pushing!', pageNumber, totalPageNumber);
                        for (
                            i = (pageNumber - 2 >= 1) ? pageNumber - 2 : 1, j = 0;
                            i <= totalPageNumber && j < 5;
                            ++i, ++j
                        ) {

                            pages.push({
                                active: (i == pageNumber),
                                number: i
                            })
                        }

                        if (data.length > pageSize) {
                            data = data.slice((pageNumber - 1) * pageSize, (pageNumber) * pageSize)
                        }
                        var viewData = {
                            categories: allCategories.toJSON(),
                            books: data,
                            count: count,

                        }
                        if (pages.length > 0) {
                            viewData.pages = {
                                prev: {
                                    if: (pages[0].number - 1 >= 1),
                                        number: pages[0].number - 1
                                },
                                current: pages,
                                    next: {
                                    if: (pages[pages.length - 1].number + 1 <= totalPageNumber),
                                        number: pages[pages.length - 1].number + 1
                                }
                            }
                        }
                        if (req.params.category) {
                            viewData.category=  category.toJSON();
                        } else {
                            viewData.category = {
                                char: ''
                            }
                        }
                        res.render('books', viewData);
                    })

            } else {
                res.render('books', {
                    categories: allCategories.toJSON(),
                    error: '没有这个分类~'
                });
            }
            //}

        });
});

router.get('/index', function (req, res, next) {
    //res.send('there are books.');
    knex.select('title', 'author', 'year').from('books').then(function (data) {
//取到的数据
        res.json(data)
    });
});

router.get('/hot', function (req, res) {
    res.render('books/hot', {});
});

router.post('/hot', function (req, res) {
    console.log(req.body);
    knex('books').insert({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    }).then(function () {
        res.render('books/create', {});
    });

});

router.get('/new', function (req, res) {
    res.render('books/new', {});
});


router.get('/detail', function (req, res) {
    res.render('books/detail', {});
});

//router.get('/detail/1', function(req, res) {
//    var id = req.params.id;
//    res.send(req.params);
//})

module.exports = router;
