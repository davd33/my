if (!process.env.AUTH_SECRET) {
  console.log('missing env: AUTH_SECRET')
  process.exit(1)
}
if (!process.env.MONGO_DB) {
  console.log('missing env: MONGO_DB')
  process.exit(1)
}
if (!process.env.ADMIN_PASSWORD) {
  console.log('missing env: ADMIN_PASSWORD')
  process.exit(1)
}

module.exports = {
  mongo_url: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017',
  auth: {
    secret: process.env.AUTH_SECRET,
    sessionsON: false,
    db: process.env.MONGO_DB
  },
  collections: {
    ARTICLE: 'article'
  },
  users: {
    admin: {
      username: 'davd33@gmail.com',
      password: process.env.ADMIN_PASSWORD,
      id: 1
    }
  }
}
