import { Request, Response, NextFunction, Router} from 'express';
import Post from '../models/Post';

class PostRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private async getAllPost(req: Request, res:Response, next:NextFunction):Promise<void> {
        const posts = await Post.find();
        res.json(posts);
    }

    private async getPost(req: Request, res:Response, next:NextFunction):Promise<void> {
        const url = req.params.url;
        const post = await Post.findOne({ url: url});
        res.json(post);
    }

    private async createPost(req: Request, res: Response, next:NextFunction):Promise<void> {
        const post = new Post(req.body);
        await post.save();
        res.json(post);
    }

    private async updatePost(req: Request, res: Response, next:NextFunction):Promise<void> {
        const { url } = req.params;
        const post = await Post.findOneAndUpdate({ url }, req.body, { new: true});
        res.json(post);

    }

    private async deletePost(req: Request, res: Response, next:NextFunction):Promise<void> {
        const { url } = req.params;
        const post = await Post.findOneAndDelete({ url });
        res.json(post);
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