/*
This file define controller for Post, this class extend from Controller class.
With this extended class, this class obtain all methodd from parent class
*/
'use strict'
// Require model (schema) use with this controller
const POST = require('../models/post')

class PostsController {


    constructor(model) {
        this.model = POST
    }

    find(req, res, next) {
        // Get all documents and filter with queries string (req.query : ex. http://domain.ext/api/?query=string)
        this.model.find(req.query, (err, documents) => {
            res.json(documents)
        })
    }

    findById(req, res, next) {
        // Get a unique document by request param, this param need to be id
        this.model.findById(req.params.id, (err, document) => {
            if (err)
                next(err)
            else
                res.json(document)
        })
    }

    create(req, res, next) {
        // Create a document with data from body request (req.body)
        this.model.create(req.body, (err, document) => {
            if (err) {
                next(err)
            } else {
                delete document.password
                res.json(document)
            }
        })
    }

    update(req, res, next) {
        // Update a document by request param, this param need to be id with data from body request (req.body)
        this.model.update({
            _id: req.params.id
        }, req.body, (err, document) => {
            if (err) {
                next(err)
            } else {
                res.sendStatus(200)
            }
        })
    }

    delete(req, res, next) {
        // Delete a unique document by request param, this param need to be id
        this.model.findByIdAndRemove(req.params.id, (err) => {
            res.sendStatus(200)
        })
    }
}

module.exports = PostsController
