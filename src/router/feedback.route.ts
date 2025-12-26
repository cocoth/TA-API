import { FeedbackController } from "../controller/feedback.controller";
import { autoBind, createRouteGroup } from "../lib/createRoute";
import { AuthMiddleware } from "../middleware/auth.middleware";

const feedbackController = new FeedbackController()
autoBind(feedbackController)

export const feedbackRoute = createRouteGroup({
    prefix: '/feedbacks',
    routes: [
        {
            path: '/',
            method: 'GET',
            controller: feedbackController.getOnlineFeedback
        },
        {
            path: '/:page',
            method: 'GET',
            controller: feedbackController.getOnlineFeedback
        },
        {
            path: '/comments/all',
            method: 'GET',
            controller: feedbackController.getAllFeedback
        },
        {
            path: '/comments/article/:articleId',
            method: 'GET',
            controller: feedbackController.getFeedbacksByArticle
        },
        {
            path: '/comments/submit',
            method: 'POST',
            middlewares: [AuthMiddleware.verifyAuth],
            controller: feedbackController.submitFeedback
        },
        {
            path: '/comments/:id',
            method: 'DELETE',
            middlewares: [AuthMiddleware.verifyAuth],
            controller: feedbackController.deleteFeedback
        },
    ]
})