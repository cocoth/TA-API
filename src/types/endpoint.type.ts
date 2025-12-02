import { Request, RequestHandler, Response } from "express";

export declare namespace RouteType {
    type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

    type Route = {
        method: Method;
        path: string;
        controller: RouteController;
        middlewares?: RouteMiddlewareController[];
    }

    type RouteController = (req: Request, res: Response) => Response | Promise<Response> | Promise<Response | void>;

    type RouteMiddlewareController = RequestHandler;

    type RouteGroup = {
        prefix: string;
        middlewares?: RouteMiddlewareController[];
        routes: Route[];
    }

    type RouteDefinition = {
        method: Method;
        path: string;
        controller: RouteController;
        middlewares?: RouteMiddlewareController[]
    }
}

/**
 * Standardized API response interface.
 * @param T - The type of the data payload.
 * @returns The standardized API response object.
 */
export interface APIResponse<T> {
    res: Response;
    success?: boolean;
    code: number;
    message?: string;
    error?: string;
    data?: {
        [K in keyof T]: T[K];
    };
    [key: string]: any;

}