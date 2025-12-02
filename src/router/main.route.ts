import { Router } from "express";
import { authRoute } from "./auth.route";
import { userRoute } from "./user.route";

export const mainRouter = Router()
mainRouter.use(authRoute)
mainRouter.use(userRoute)
export default mainRouter;