import { prisma } from "../utils/prisma";

export class FeedbackRepo {
    static async createFeedback(data: {
        userId: number;
        articleId: string;
        articleTitle: string;
        content: string;
    }) {
        return await prisma.feedback.create({
            data,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        });
    }

    static async getFeedbacksByArticleId(articleId: string) {
        return await prisma.feedback.findMany({
            where: {
                articleId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    static async getAllFeedbacks() {
        return await prisma.feedback.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    static async getFeedbackById(id: number) {
        return await prisma.feedback.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        });
    }

    static async deleteFeedback(id: number, userId: number) {
        // Verify ownership before delete
        const feedback = await prisma.feedback.findFirst({
            where: {
                id,
                userId
            }
        });

        if (!feedback) {
            return null;
        }

        return await prisma.feedback.delete({
            where: { id }
        });
    }

    static async getFeedbackCount() {
        return await prisma.feedback.count();
    }
}
