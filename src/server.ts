import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import "dotenv/config";

import initMongo from './config/DbMongoClient';
import indexRoutes from './routes/IndexRoutes';
import postRoutes from './routes/PostRoutes';
import userRoutes from './routes/UserRoutes';


class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        initMongo.connect();
        this.app.set('port', process.env.PORT || 3000);
        // Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/api/posts', postRoutes);
        this.app.use('/api/users', userRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is running on port ${this.app.get('port')}`);
        })
    }
}

let server = new Server();
server.start();