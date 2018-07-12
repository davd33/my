const express = require('express')
const router = express.Router()
module.exports = router

const passport = require('passport')
const jwt = require('jwt-simple')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const dbConfig = require('../../config/database')

const ADMIN_USER = dbConfig.users.admin
const SAFE_ADMIN_USER = {
  username: ADMIN_USER.username,
  id: ADMIN_USER.id
}

const db = require('./db')(dbConfig)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: dbConfig.auth.secret
}
passport.use(new JwtStrategy(jwtOptions, function (jwt_payload, done) {
  if (jwt_payload.id === 1) {
    done(null, SAFE_ADMIN_USER)
  } else done(null, false)
}))

function verifyAdminLogin(username, password) {
  return username === ADMIN_USER.username && password === ADMIN_USER.password
}

db.createArticleCollection()

router.post('/login', (req, res) => {
  let verified = verifyAdminLogin(req.body.username, req.body.password)
  SAFE_ADMIN_USER['token'] = jwt.encode({
    id: ADMIN_USER.id
  }, dbConfig.auth.secret)
  res.send(verified ? SAFE_ADMIN_USER : false)
})

router.get('/user/is-admin/:username',
  passport.authenticate('jwt', {session: dbConfig.auth.sessionsON}),
  (req, res) => {
    res.send(req.params.username === ADMIN_USER.username)
  })

router.get('/blog/all', (req, res) => {
  db.findAllArticles(result => {
    res.send(result)
  })
})

router.get('/blog/edit/:id',
  passport.authenticate('jwt', {session: dbConfig.auth.sessionsON}),
  (req, res) => {
    db.findArticle(req.params.id, result => {
      res.send(result)
    })
  })

router.post('/blog/edit/:id',
  passport.authenticate('jwt', {session: dbConfig.auth.sessionsON}),
  (req, res) => {
    db.editArticle(req.params.id, req.body, result => {
      res.send(result)
    })
  })

router.get('/blog/edit/:id/publish',
  passport.authenticate('jwt', {session: dbConfig.auth.sessionsON}),
  (req, res) => {
    db.editArticle(req.params.id, {published: true}, result => {
      res.send(result)
    })
  })

router.get('/blog/edit/:id/unpublish',
  passport.authenticate('jwt', {session: dbConfig.auth.sessionsON}),
  (req, res) => {
    db.editArticle(req.params.id, {published: false}, result => {
      res.send(result)
    })
  })

router.put('/blog/edit',
  passport.authenticate('jwt', {session: dbConfig.auth.sessionsON}),
  (req, res) => {
    db.createArticle(
      Object.assign(req.body, {
        published: false
      }),
      result => {
        res.send(result)
      })
  })

router.delete('/blog/edit/:id',
  passport.authenticate('jwt', {session: dbConfig.auth.sessionsON}),
  (req, res) => {
    db.removeArticle(req.params.id, result => {
      res.send(result)
    })
  })
