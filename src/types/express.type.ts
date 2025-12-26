/**
 * Standardized API response interface.
 * @param T - The type of the data payload.
 * @returns The standardized API response object.
 */
interface ApiResponse<T> {
    success?: boolean;
    code: number;
    message?: string;
    error?: string;
    data?: {
        [K in keyof T]: T[K];
    };
    [key: string]: any;
}

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            userId: number;
        };
    }

    interface Response {
        /**
         * Send a standardized API response.
         * @param data - The API response data.
         * @returns The Express Response object.
         */
        sendResponse: <T>(data: ApiResponse<T>) => Response,
        /**
         * Send a standardized API error response.
         * @param data - The API error response data.
         * @returns The Express Response object.
         */
        sendError: <T>(data: ApiResponse<T>) => Response
    }
}
