import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
    static verifyAuth(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(" ")[1] || req.cookies['session_id'];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    }

    static cors(req: Request, res: Response, next: NextFunction) {
        const origin = req.headers.origin;

        // Daftar allowed origins
        const allowedOrigins = [
            "http://localhost:3000",
            "https://localhost:3000",
            // /https:\/\/.*\.zappinx\.com/,
        ];

        const isAllowed = allowedOrigins.some(allowed => {
            typeof allowed === 'string' && allowed === origin
            // : allowed.test(origin || '');
        });

        if (isAllowed && origin) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        } else {
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        }

        res.setHeader("Vary", "Origin");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, Cookie");
        res.setHeader("Access-Control-Allow-Credentials", "true");

        res.header('X-Content-Type-Options', 'nosniff');
        res.header('X-Frame-Options', 'DENY');
        res.header('X-XSS-Protection', '1; mode=block');
        res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
        res.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

        res.header('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none';");
        res.header('X-Security-Level', 'strict');

        if (req.method === "OPTIONS") {
            return res.sendStatus(204);
        }

        next();
    }
}