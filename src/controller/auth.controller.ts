import { Request, Response } from "express";
import crypto from "crypto";
import { UserRepo } from "../repo/user.repo";
import JWT from "../lib/tokenizer";

export class AuthController {
    private generateToken(token: string): string {
        return crypto.createHash('sha256').update(token).digest('hex');
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendError({
                code: 400,
                message: "Email and password are required",
            })
        }

        const findUser = await UserRepo.getUserByEmail(email);
        if (!findUser) {
            return res.sendError({
                code: 404,
                message: "User not found",
            })
        }

        if (email && password === findUser.password) {
            const token = JWT.sign({ userId: findUser.id });
            
            res.cookie("session_id", token, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
            });

            return res.sendResponse({
                code: 200,
                message: "Login successful",
                data: {
                    email: findUser.email,
                    name: findUser.name,
                }
            });

        } else {
            return res.sendError({
                code: 401,
                message: "Invalid email or password",
            });
        }
    }

    logout(req: Request, res: Response) {
        res.clearCookie("session_id");
        return res.sendResponse({
            code: 200,
            message: "Logout successful",
        });
    }

    async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.sendError({
                code: 400,
                message: "Name, email, and password are required",
            });
        }

        if (password.length < 6) {
            return res.sendError({
                code: 400,
                message: "Password must be at least 6 characters",
            });
        }

        try {
            const existingUser = await UserRepo.getUserByEmail(email);
            if (existingUser) {
                return res.sendError({
                    code: 409,
                    message: "Email already registered",
                });
            }

            const newUser = await UserRepo.createUser({
                name,
                email,
                password
            });

            return res.sendResponse({
                code: 201,
                message: "Registration successful",
                data: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                }
            });
        } catch (error) {
            return res.sendError({
                code: 500,
                message: "Failed to register user",
            });
        }
    }
}