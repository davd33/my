const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const passport = require('passport')
const jwt = require('jwt-simple')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const dbConfig = require('../../config/database')

module.exports = router

const MONGO_URL = dbConfig.mongo_url
const DB = dbConfig.auth.db
const AUTH_SECRET = dbConfig.auth.secret
const SESSIONS_ON = dbConfig.auth.sessionsON
const COLLECTIONS = dbConfig.collections
const ADMIN_USER = dbConfig.users.admin
const SAFE_ADMIN_USER = {
  username: ADMIN_USER.username,
  id: ADMIN_USER.id
}

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: AUTH_SECRET
}
passport.use(new JwtStrategy(jwtOptions, function (jwt_payload, done) {
  if (jwt_payload.id === 1) {
    done(null, SAFE_ADMIN_USER)
  } else done(null, false)
}))

function verifyAdminLogin(username, password) {
  return username === ADMIN_USER.username && password === ADMIN_USER.password
}

function connect(cb) {
  MongoClient.connect(`${MONGO_URL}/${DB}`, function(err, db) {
    if (err) throw err;
    cb(db.db(DB))
      .then(() => {
        db.close()
      })
  })
}

function createArticleCollection() {
  connect(db => new Promise(resolve => {
    db.createCollection(COLLECTIONS.ARTICLE, function(err, res) {
      if (err) throw err
      console.log("Article collection created!")
      resolve()
    })
  }))
}

function findAllArticles(cb) {
  connect(db => new Promise(resolve => {
    db.collection(COLLECTIONS.ARTICLE).find({}).toArray(function(err, result) {
      if (err) throw err
      cb(result)
      resolve()
    })
  }))
}

function createArticle(doc, cb) {
  connect(db => new Promise(resolve => {
    db.collection(COLLECTIONS.ARTICLE).insert(doc, (err, result) => {
      if (err) throw err
      cb(result)
      resolve()
    })
  }))
}

function removeArticle(id, cb) {
  connect(db => new Promise(resolve => {
    db.collection(COLLECTIONS.ARTICLE).deleteOne({_id: ObjectId(id)}, (err, result) => {
      if (err) throw err
      cb(result)
      resolve()
    })
  }))
}

createArticleCollection()

router.post('/login', (req, res) => {
  let verified = verifyAdminLogin(req.body.username, req.body.password)
  SAFE_ADMIN_USER['token'] = jwt.encode({
    id: ADMIN_USER.id
  }, AUTH_SECRET)
  res.send(verified ? SAFE_ADMIN_USER : false)
})

router.get('/blog/all', (req, res) => {
  findAllArticles(result => {
    res.send(result)
  })
})

router.post('/blog/edit/:id', passport.authenticate('jwt', {session: SESSIONS_ON}), (req, res) => {
  res.send({edit:'blog :id edited'})
})

router.put('/blog/edit', passport.authenticate('jwt', {session: SESSIONS_ON}), (req, res) => {
  createArticle(req.body, result => {
    res.send(result)
  })
})

router.delete('/blog/edit/:id', passport.authenticate('jwt', {session: SESSIONS_ON}), (req, res) => {
  removeArticle(req.params.id, result => {
    res.send(result)
  })
})
