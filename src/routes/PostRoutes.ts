import { Request, Response, NextFunction, Router} from 'express';
import { Error } from 'mongoose';
import createError from 'http-errors';
import Post from '../models/Post';

class PostRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private async getAllPost(req: Request, res:Response, next:NextFunction):Promise<void> {
        try {
            const posts = await Post.find();
            res.json(posts);            
        } catch (error) {
            next(error);
        }
    }

    private async getPost(req: Request, res:Response, next:NextFunction):Promise<void> {
        try {
            const { url } = req.params;
            const post = await Post.findOne({ url });
            if(!post) {
                throw createError(404, 'Post does not exist.');
            }
            res.json(post);            
        } catch (error) {
            if(error instanceof Error.CastError) {
                next(createError(400, 'Invalid post id'));
                return;
            }
            next(error);
        }
    }

    private async createPost(req: Request, res: Response, next:NextFunction):Promise<void> {
        try {
            const post = new Post(req.body);
            await post.save();
            res.json(post);            
        } catch (error) {     
            if(error.name === 'ValidationError') {
                return next(createError(422, error.message));
            }
            next(error);
        }
    }

    private async updatePost(req: Request, res: Response, next:NextFunction):Promise<void> {
        try {            
            const { url } = req.params;
            const post = await Post.findOneAndUpdate({ url }, req.body, { new: true});
            if(!post) {
                throw createError(404, 'Post does not exist.');
            }
            res.json(post);
        } catch (error) {            
            if(error instanceof Error.CastError) {
                return next(createError(400, 'Invalid post id'));
            }
            next(error);            
        }
    }

    private async deletePost(req: Request, res: Response, next:NextFunction):Promise<void> {
        try {
            const { url } = req.params;
            const post = await Post.findOneAndDelete({ url });
            if(!post) {
                throw createError(404, 'Post does not exist.');
            }
            res.json(post);
        } catch (error) {
            if(error instanceof Error.CastError) {
                next(createError(400, 'Invalid post id'));
                return;
            }
            next(error);            
        }
    }

    public routes() {
        this.router.get('/', this.getAllPost);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }

}

const postRoutes = new PostRoutes();
export default postRoutes.router;