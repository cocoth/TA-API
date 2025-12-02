import { APIResponse } from "@/src/types/endpoint.type";
import { Request, Response } from "express";

export class BaseController {
    static inject() {
        return (req: Request, res: Response, next: Function) => {
            res.sendResponse = (data) => {
                return BaseController.sendResponse({
                    ...data,
                    res
                });
            }
            res.sendError = (data) => {
                return BaseController.sendError({
                    ...data,
                    res
                });
            }
            next();
        }
    }

    protected sendResponse<T>(data: APIResponse<T>): Response {
        const { res, ...rest } = data;
        return res.status(rest.code).json({
            success: rest.code < 400,
            timestamp: Date.now(),
            ...rest
        });
    }


    protected sendError<T>(data: APIResponse<T>): Response {
        const { res, ...rest } = data;
        return res.status(rest.code).json({
            success: rest.code < 400,
            timestamp: Date.now(),
            ...rest
        });
    }

    protected static sendResponse<T>(data: APIResponse<T>): Response {
        const { res, ...rest} = data;
        return res.status(rest.code).json({
            success: rest.code < 400,
            timestamp: Date.now(),
            ...rest
        });
    }

    protected static sendError<T>(data: APIResponse<T>): Response {
        const { res, ...rest } = data;
        return res.status(rest.code).json({
            success: rest.code < 400,
            timestamp: Date.now(),
            ...rest
        });
    }
}