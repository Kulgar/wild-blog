module.exports = {
    "development": {
        db: process.env.MONGODB_URI ||  'mongodb://localhost:27017/blog',
        secretToken: process.env.SECRET_TOKEN || 'secretToken'
    },
    "production": {
        db: process.env.MONGODB_URI ||  'mongodb://localhost:27017/blog',
        secretToken: process.env.SECRET_TOKEN || 'secretToken'
    }
}
