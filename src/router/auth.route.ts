import { AuthController } from "../controller/auth.controller";
import { autoBind, createRouteGroup } from "../lib/createRoute";

const authController = new AuthController()
autoBind(authController)

export const authRoute = createRouteGroup({
    prefix: '/auth',
    middlewares: [],
    routes: [
        {
            path: '/login',
            method: 'POST',
            controller: authController.login
        },
        {
            path: '/register',
            method: 'POST',
            controller: authController.register
        },
        {
            path: '/logout',
            method: 'POST',
            controller: authController.logout
        }
    ]
})