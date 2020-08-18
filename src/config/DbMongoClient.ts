import mongoose from 'mongoose';

class DbMongoClient {
    connect() {
        mongoose.connect(`${process.env.MONGODB_URI}`, {
            dbName : process.env.DB_NAME,
            user : process.env.DB_USER,
            pass: process.env.DB_PASS,
            useNewUrlParser: true,
            useFindAndModify: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('Mongodb connected')
        })
        .catch(err => console.error(err.message));        
    }
}

export default new DbMongoClient();