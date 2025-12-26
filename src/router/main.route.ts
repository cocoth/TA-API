import { Router } from "express";
import { authRoute } from "./auth.route";
import { userRoute } from "./user.route";
import { feedbackRoute } from "./feedback.route";

export const mainRouter = Router()
mainRouter.use(authRoute)
mainRouter.use(userRoute)
mainRouter.use(feedbackRoute)
export default mainRouter;