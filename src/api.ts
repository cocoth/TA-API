import express from 'express'
import { createServer } from 'http';
import { BaseController } from './lib/baseResponse';
import { AuthMiddleware } from './middleware/auth.middleware';
import cookieParser from 'cookie-parser';
import { endpointManager } from './lib/endpointManager';
import { loggerMiddleware } from './middleware/logger.middleware';
import mainRouter from './router/main.route';

const PORT = process.env.PORT || 8000;
const HOST = 'localhost';

const app = express()
const server = createServer(app);
app.use(BaseController.inject())

app.set("trust proxy", true);
app.use(AuthMiddleware.cors);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(loggerMiddleware);

const apiPath = "/api/v1";
app.use(apiPath, mainRouter);

app.use((req, res, next) => {
    console.log(req.url)
    console.log(req.path)
    if (
        req.url.startsWith("/api/")
        && !req.url.startsWith(apiPath)
    ) {
        next();
    }
    return res.status(404).json({
        success: false,
        status: 404,
        message: "Endpoint not found",
        data: null
    });
});


server.listen(PORT, () => {
    endpointManager.printAllEndpoints(apiPath);
    console.log(`Server is listening on http://${HOST}:${PORT}${apiPath}\n`);
});