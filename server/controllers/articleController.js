const Article = require('../models/article.js');
const JWTDecoder = require('../helpers/JWTDecoder.js')

class ArticleController {
  static create(req, res){
    Article
      .create({
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        created_at: new Date,
        userId: req.headers.userid
      })
      .then(article => {
        res.status(201).json(article);
      })
      .catch(err => {
        res.status(500).json({err: err.message});
      })
  }

  static read(req, res){
    Article
      .find()
      .then(articles => {
        res.status(200).json(articles);
      })
      .catch(err => {
        res.status(500).json({err: err.message});
      })
  }

  static edit(req, res){
    Article
      .findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        created_at: new Date,
        userId: req.headers.userid
      }, {
        new: true
      })
      .then(article => {
        res.status(200).json(article);
      })
      .catch(err => {
        res.status(500).json({err: err.message});
      })
  }

  static remove(req, res){
    
    Article
      .findByIdAndDelete(req.params.id)
      .then(article => {
        res.status(200).json(article);
      })
      .catch(err => {
        res.status(500).json({err: err.message});
      })
  }
}

module.exports = ArticleController;