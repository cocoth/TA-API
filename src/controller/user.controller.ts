import { Request, Response } from "express";

interface User {
    id: number;
    name: string;
    university: string;
    email: string;
}

const users: User[] = [
    { id: 1, name: "Andi Wijaya", university: "Universitas Indonesia", email: "andi.wijaya@ui.ac.id" },
    { id: 2, name: "Budi Santoso", university: "Institut Teknologi Bandung", email: "budi.santoso@itb.ac.id" },
    { id: 3, name: "Citra Dewi", university: "Universitas Gadjah Mada", email: "citra.dewi@ugm.ac.id" },
    { id: 4, name: "Dewi Lestari", university: "Universitas Airlangga", email: "dewi.lestari@unair.ac.id" },
    { id: 5, name: "Eko Prasetyo", university: "Universitas Diponegoro", email: "eko.prasetyo@undip.ac.id" },
    { id: 6, name: "Fajar Nugroho", university: "Universitas Brawijaya", email: "fajar.nugroho@ub.ac.id" },
    { id: 7, name: "Gita Permata", university: "Universitas Padjadjaran", email: "gita.permata@unpad.ac.id" },
    { id: 8, name: "Hadi Saputra", university: "Universitas Sebelas Maret", email: "hadi.saputra@uns.ac.id" },
    { id: 9, name: "Intan Sari", university: "Universitas Hasanuddin", email: "intan.sari@unhas.ac.id" },
    { id: 10, name: "Joko Susilo", university: "Institut Pertanian Bogor", email: "joko.susilo@ipb.ac.id" }
];



export class UserController {
    getUser(req: Request, res: Response) {
        const { id } = req.params
        if(!id) {
            return res.sendResponse({
                code: 200,
                message: "User list retrieved successfully",
                data: users
            })
        }

        const user = users.find(user => user.id === parseInt(id ?? ""));
        if (!user) {
            return res.sendResponse({
                code: 404,
                message: "User not found",
            })
        }

        return res.sendResponse({
            code: 200,
            message: "User retrieved successfully",
            data: user
        })
    }
    addUser(req: Request, res: Response) {
        const { name, university, email } = req.body;
        const newUser: User = {
            id: users.length + 1,
            name,
            university,
            email
        };
        users.push(newUser);
        return res.sendResponse({
            code: 201,
            message: "User added successfully",
            data: newUser
        });
    }

    updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { 
            name, 
            university, 
            email 
        } = req.body;
        
        const user = users.find(user => user.id === parseInt(id ?? ""));
        if (!user) {
            return res.sendResponse({
                code: 404,
                message: "User not found",
            })
        }

        user.name = name || user.name;
        user.university = university || user.university;
        user.email = email || user.email;

        return res.sendResponse({
            code: 200,
            message: "User updated successfully",
            data: user
        })
    }

    deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        const userIndex = users.findIndex(user => user.id === parseInt(id ?? ""));
        if (userIndex === -1) {
            return res.sendResponse({
                code: 404,
                message: "User not found",
            })
        }

        users.splice(userIndex, 1);
        return res.sendResponse({
            code: 200,
            message: "User deleted successfully",
        })
    }
}