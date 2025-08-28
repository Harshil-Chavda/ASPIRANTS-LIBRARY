Sure, here's the contents for the file `/aspirants-library/aspirants-library/src/controllers/userController.ts`:

import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
    async register(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;
            const newUser = new User({ username, email, password });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            // Generate token logic here
            res.status(200).json({ message: 'Login successful', token: 'generated_token' });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user profile', error });
        }
    }
}

export default new UserController();