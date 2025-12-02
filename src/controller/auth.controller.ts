import { Request, Response } from "express";
import crypto from "crypto";

export class AuthController {
    private generateToken(token: string): string {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
    
    login(req: Request, res: Response) {
        const { username, password } = req.body;
        if (username === "admin" && password === "password") {
            res.cookie("session_id", "some_session_id", {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
            });
            
            const token = this.generateToken("user-session");
            return res.sendResponse({
                code: 200,
                message: "Login successful",
                data: { token }
            })
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    }

    logout(req: Request, res: Response) {
        res.clearCookie("session_id");
        return res.sendResponse({
            code: 200,
            message: "Logout successful",
        });
    }
}