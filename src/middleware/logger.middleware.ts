import { NextFunction, Request, Response } from "express";
import { terminalColors } from "@/src/utils/color";
import { performance } from "perf_hooks";

/**
 * Formats a duration in milliseconds into a human-readable string.
 * @param durationMs - Duration in milliseconds to format.
 */
export function formatDuration(durationMs: number): string {
    if (durationMs < 1) {
        const microseconds = durationMs * 1000;
        return `${microseconds.toFixed(0)}μs`;
    } else if (durationMs < 1000) {
        return `${durationMs.toFixed(1)}ms`;
    } else if (durationMs < 60000) {
        return `${(durationMs / 1000).toFixed(2)}s`;
    } else {
        return `${(durationMs / 60000).toFixed(2)}m`;
    }
}

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {

        const startTime = performance.now()

        const remoteAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '-';
        const now = new Date().getTime();
        const time = new Date(now).toISOString().replace('T', ' ').replace('Z', '');
        const method = req.method;
        const url = req.originalUrl || req.url;
        const protocol = `HTTP/${req.httpVersion}`;
        const referrer = req.headers['referer'] || req.headers['referrer'] || '-';
        const userAgent = req.headers['user-agent'] || '-';

        // Log after response to get status and size
        res.on('finish', () => {
            const endTime = performance.now();

            const responseTimeMs = endTime - startTime;

            const statusCodeColor = res.statusCode >= 500 ? terminalColors.RED
                : res.statusCode >= 400 ? terminalColors.YELLOW
                    : res.statusCode >= 300 ? terminalColors.CYAN
                        : res.statusCode >= 200 ? terminalColors.GREEN
                            : terminalColors.WHITE;

            const status = `${statusCodeColor}${res.statusCode}${terminalColors._reset}`;
            const length = res.getHeader('content-length') || '-';

            let responseTimeStr = formatDuration(responseTimeMs)
            const message = `${remoteAddr} - [${time}] "${method} ${url} ${protocol}" ${status} ${length} "${referrer}" "${userAgent}" ${responseTimeStr}`;
            console.log(message);
        });
        next();
    } catch (error) {
        next();
    }

};