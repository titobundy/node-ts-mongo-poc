import { Request, Response, NextFunction, Router} from 'express';
import User from '../models/User';

class UserRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private async getAllUser(req: Request, res:Response, next:NextFunction):Promise<void> {
        const users = await User.find();
        res.json(users);
    }

    private async getUser(req: Request, res:Response, next:NextFunction):Promise<void> {
        const { username } = req.params;
        const user = await User.findOne({ username }).populate('posts', 'title url -_id');
        res.json(user);
    }

    private async createUser(req: Request, res: Response, next:NextFunction):Promise<void> {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    }

    private async updateUser(req: Request, res: Response, next:NextFunction):Promise<void> {
        const { username } = req.params;
        const user = await User.findOneAndUpdate({ username }, req.body, { new: true});
        res.json(user);

    }

    private async deleteUser(req: Request, res: Response, next:NextFunction):Promise<void> {
        const { username } = req.params;
        const user = await User.findOneAndDelete({ username });
        res.json(user);
    }

    public routes() {
        this.router.get('/', this.getAllUser);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }

}

const userRoutes = new UserRoutes();
export default userRoutes.router;