'use strict';
exports.renderIndex = function (req, res) {
    res.render('modules/core/server/views/index', {
        user: req.user || null
    });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
    res.status(500).render('modules/core/server/views/500', {
        error: 'Oops! Something went wrong...'
    });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

    res.status(404).format({
        'text/html': function () {
            res.render('modules/core/server/views/404', {
                url: req.originalUrl
            });
        },
        'application/json': function () {
            res.json({
                error: 'Path not found'
            });
        },
        'default': function () {
            res.send('Path not found');
        }
    });
};

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Category = mongoose.model('CategoryServerModel'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');

/**
 * Create a Core
 */
exports.create = function (req, res) {
    var category=new Category(req.body);
    category.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.status(201).json(category);
        }
    });
};

/**
 * Show the current Core
 */
exports.read = function (req, res) {
    Category.findById(req.params.categoryId).exec(function(err, category) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!category) {
                return res.status(404).send({
                    message: 'Category not found'
                });
            }
            res.json(category);
        }
    });
};

/**
 * Update a Core
 */
exports.update = function (req, res) {

};

/**
 * Delete an Core
 */
exports.delete = function (req, res) {

};

/**
 * List of Cores
 */
exports.list = function (req, res) {
    Category.find().exec(function(err,categories){
        if(err){
            return res.status(400).send({
                message:errorHandler.getErrorMessage(err)
            });
        }else{
            res.json(categories);
        }
    });

};
