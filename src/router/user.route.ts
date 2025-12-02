import { UserController } from "../controller/user.controller";
import { autoBind, createRouteGroup } from "../lib/createRoute";
import { AuthMiddleware } from "../middleware/auth.middleware";

const userController = new UserController()
autoBind(userController)

export const userRoute = createRouteGroup({
    prefix: '/users',
    middlewares: [AuthMiddleware.verifyAuth],
    routes: [
        {
            path: '/',
            method: 'GET',
            controller: userController.getUser
        },
        {
            path: '/:id',
            method: 'GET',
            controller: userController.getUser
        },
        {
            path: '/',
            method: 'POST',
            controller: userController.addUser
        },
        {
            path: '/:id',
            method: 'PATCH',
            controller: userController.updateUser
        },
        {
            path: '/:id',
            method: 'DELETE',
            controller: userController.deleteUser
        }
    ]
})