import { prisma } from "../utils/prisma";

export class UserRepo {
    static async getUserByEmail(email: string) {
        const user = prisma.user.findUnique({
            where: { email }
        })
        return user;
    }

    static async getUserById(id: number) {
        const user = prisma.user.findUnique({
            where: { id }
        })
        return user;
    }

    static async createUser(data: { name: string; email: string; password: string }) {
        const user = await prisma.user.create({
            data
        })
        return user;
    }
}