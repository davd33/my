const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

function DB(options) {
  this.options = options
}

DB.prototype.connect = function (cb) {
  let dbName = this.options.db
  MongoClient.connect(`${this.options.mongo_url}/${dbName}`, function (err, db) {
    if (err) throw err;
    cb(db.db(dbName))
      .then(() => {
        db.close()
      })
  })
}

DB.prototype.createArticleCollection = function () {
  this.connect(db => new Promise(resolve => {
    db.createCollection(this.options.collections.ARTICLE, function (err, res) {
      if (err) throw err
      console.log("Article collection created!")
      resolve()
    })
  }))
}

DB.prototype.findAllArticles = function (cb) {
  this.connect(db => new Promise(resolve => {
    db.collection(this.options.collections.ARTICLE)
      .find({}).toArray(function (err, result) {
      if (err) throw err
      cb(result)
      resolve()
    })
  }))
}

DB.prototype.findArticle = function (id, cb) {
  this.connect(db => new Promise(resolve => {
    db.collection(this.options.collections.ARTICLE)
      .findOne({_id: ObjectId(id)}, function (err, result) {
        if (err) throw err
        cb(result)
        resolve()
      })
  }))
}

DB.prototype.createArticle = function (doc, cb) {
  this.connect(db => new Promise(resolve => {
    db.collection(this.options.collections.ARTICLE)
      .insert(doc, (err, result) => {
        if (err) throw err
        cb(result)
        resolve()
      })
  }))
}

DB.prototype.removeArticle = function (id, cb) {
  this.connect(db => new Promise(resolve => {
    db.collection(this.options.collections.ARTICLE)
      .deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) throw err
        cb(result)
        resolve()
      })
  }))
}

DB.prototype.replaceArticle = function (id, doc, cb) {
  this.connect(db => new Promise(resolve => {
    db.collection(this.options.collections.ARTICLE)
      .replaceOne({_id: ObjectId(id)}, doc, (err, result) => {
        if (err) throw err
        cb(result)
        resolve()
      })
  }))
}

DB.prototype.editArticle = function (id, doc, cb) {
  this.connect(db => new Promise(resolve => {
    db.collection(this.options.collections.ARTICLE)
      .updateOne(
        {_id: ObjectId(id)},
        {
          $set: doc
        },
        (err, result) => {
          if (err) throw err
          cb(result)
          resolve()
        })
  }))
}

module.exports = function (options) {
  if (!options) {
    console.log('DB module missing option configuration!')
    process.exit(2)
  }

  return new DB(options)
}
