import { readFileSync } from "fs";
import jwt, { JwtPayload } from "jsonwebtoken"
import path from "path";

class JWT {
    // private static secret: string = readFileSync(path.join(process.cwd(), 'private.key'), 'utf8')
    private static secret: string = process.env.JWT_SECRET || "default_secret_key";
    private static algorithm: jwt.Algorithm = "HS256";

    constructor() {
        if (!JWT.secret) {
            throw new Error("JWT secret is not set");
        }
    }

    static setConfig(secret: string, algorithm: jwt.Algorithm) {
        this.secret = secret;
        this.algorithm = algorithm;
    }

    static sign(payload: object, options?: jwt.SignOptions): string {
        return jwt.sign(payload,
            JWT.secret, {
            algorithm: JWT.algorithm,
            ...options
        });
    }

    static verify<T>(token: string, options?: jwt.VerifyOptions): JwtPayload & T | null {
        try {
            const decoded = jwt.verify(token, JWT.secret, {
                algorithms: [JWT.algorithm],
                ...options
            });
            
            if (typeof decoded === 'object' && decoded !== null) {
                return decoded as JwtPayload & T;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    static decode<T>(token: string): JwtPayload & T | null {
        const decoded = jwt.decode(token);
        
        if (typeof decoded === 'object' && decoded !== null) {
            return decoded as JwtPayload & T;
        }
        return null;
    }

    static isValid(token: string): boolean {
        return this.verify(token) !== null;
    }

}

export default JWT;