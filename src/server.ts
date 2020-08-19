import express, { ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import "dotenv/config";
import createError from 'http-errors';

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
        this.errorMiddleware();
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

    errorMiddleware() {
        this.app.use((req, res, next) => {    
            next(createError(404, 'Not found'));
        });

        const errHandler: ErrorRequestHandler = (err, req, res, next) => {            
            res.status(err.status || 500);
            res.send({
                error : {
                    status : err.status || 500,
                    message : err.message
                }
            });
        };
        this.app.use(errHandler);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is running on port ${this.app.get('port')}`);
        })
    }
}

let server = new Server();
server.start();