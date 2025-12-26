import { Request, Response } from "express";
import { FeedbackRepo } from "../repo/feedback.repo";

export class FeedbackController {
    private newsApiUrl: string = process.env.NEWS_API_URL || "https://newsapi.org/v2/top-headlines?country=us";
    private newsApiKey: string = process.env.NEWS_API_KEY || "your_api_key_here";
    private prefixApi: string = `&apiKey=${this.newsApiKey}`;

    async getOnlineFeedback(req: Request, res: Response) {
        let url = `${this.newsApiUrl}/everything?q=feedbacks&pageSize=10${this.prefixApi}`;
        
        const { page } = req.params;
        
        if (page) {
            url = url.concat(`&page=${page}`);
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            return res.sendResponse({
                code: 200,
                message: "Feedbacks retrieved successfully",
                data: data
            });
        } catch (error) {
            return res.sendError({
                code: 500,
                message: "Failed to fetch feedbacks",
            });
        }
    }

    async getAllFeedback(req: Request, res: Response) {
        try {
            const feedbacks = await FeedbackRepo.getAllFeedbacks();
            
            return res.sendResponse({
                code: 200,
                message: "All feedbacks retrieved successfully",
                data: feedbacks
            });
        } catch (error) {
            return res.sendError({
                code: 500,
                message: "Failed to fetch feedbacks",
            });
        }
    }

    async getFeedbacksByArticle(req: Request, res: Response) {
        const { articleId } = req.params;
        
        if (!articleId) {
            return res.sendError({
                code: 400,
                message: "Article ID is required",
            });
        }

        try {
            const feedbacks = await FeedbackRepo.getFeedbacksByArticleId(articleId);
            
            return res.sendResponse({
                code: 200,
                message: "Feedbacks for article retrieved successfully",
                data: feedbacks
            });
        } catch (error) {
            return res.sendError({
                code: 500,
                message: "Failed to fetch feedbacks for article",
            });
        }
    }

    async submitFeedback(req: Request, res: Response) {
        const { articleId, articleTitle, content } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            return res.sendError({
                code: 401,
                message: "Unauthorized. Please login first.",
            });
        }

        if (!articleId || !articleTitle || !content) {
            return res.sendError({
                code: 400,
                message: "Article ID, article title, and feedback content are required",
            });
        }

        if (content.trim().length < 3) {
            return res.sendError({
                code: 400,
                message: "Feedback content must be at least 3 characters",
            });
        }

        try {
            const feedback = await FeedbackRepo.createFeedback({
                userId,
                articleId,
                articleTitle,
                content: content.trim()
            });

            return res.sendResponse({
                code: 201,
                message: "Feedback submitted successfully",
                data: feedback
            });
        } catch (error) {
            console.error("Error submitting feedback:", error);
            return res.sendError({
                code: 500,
                message: "Failed to submit feedback",
            });
        }
    }

    async deleteFeedback(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.user?.userId;

        if (!userId) {
            return res.sendError({
                code: 401,
                message: "Unauthorized",
            });
        }

        if (!id) {
            return res.sendError({
                code: 400,
                message: "Feedback ID is required",
            });
        }

        try {
            const deleted = await FeedbackRepo.deleteFeedback(parseInt(id), userId);

            if (!deleted) {
                return res.sendError({
                    code: 404,
                    message: "Feedback not found or you don't have permission to delete it",
                });
            }

            return res.sendResponse({
                code: 200,
                message: "Feedback deleted successfully",
                data: deleted
            });
        } catch (error) {
            return res.sendError({
                code: 500,
                message: "Failed to delete feedback",
            });
        }
    }
}
