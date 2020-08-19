"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const http_errors_1 = __importDefault(require("http-errors"));
const DbMongoClient_1 = __importDefault(require("./config/DbMongoClient"));
const IndexRoutes_1 = __importDefault(require("./routes/IndexRoutes"));
const PostRoutes_1 = __importDefault(require("./routes/PostRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
        this.errorMiddleware();
    }
    config() {
        DbMongoClient_1.default.connect();
        this.app.set('port', process.env.PORT || 3000);
        // Middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
    }
    routes() {
        this.app.use(IndexRoutes_1.default);
        this.app.use('/api/posts', PostRoutes_1.default);
        this.app.use('/api/users', UserRoutes_1.default);
    }
    errorMiddleware() {
        this.app.use((req, res, next) => {
            next(http_errors_1.default(404, 'Not found'));
        });
        const errHandler = (err, req, res, next) => {
            res.status(err.status || 500);
            res.send({
                error: {
                    status: err.status || 500,
                    message: err.message
                }
            });
        };
        this.app.use(errHandler);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is running on port ${this.app.get('port')}`);
        });
    }
}
let server = new Server();
server.start();
