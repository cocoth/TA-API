import { UserController } from "../controller/user.controller";
import { autoBind, createRouteGroup } from "../lib/createRoute";
import { AuthMiddleware } from "../middleware/auth.middleware";

const userController = new UserController()
autoBind(userController)

export const userRoute = createRouteGroup({
    prefix: '/user',
    routes: [
        {
            path: '/me',
            method: 'GET',
            middlewares: [AuthMiddleware.verifyAuth],
            controller: userController.getMe
        },
        {
            path: '/',
            method: 'GET',
            middlewares: [AuthMiddleware.verifyAuth],
            controller: userController.getUser
        },
        {
            path: '/:id',
            method: 'GET',
            middlewares: [AuthMiddleware.verifyAuth],
            controller: userController.getUser
        },
        {
            path: '/',
            method: 'POST',
            middlewares: [AuthMiddleware.verifyAuth],
            controller: userController.addUser
        },
        {
            path: '/:id',
            method: 'PATCH',
            middlewares: [AuthMiddleware.verifyAuth],
            controller: userController.updateUser
        },
        {
            path: '/:id',
            method: 'DELETE',
            middlewares: [AuthMiddleware.verifyAuth],
            controller: userController.deleteUser
        }
    ]
})