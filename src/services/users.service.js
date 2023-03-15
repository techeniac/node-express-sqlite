const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

class UsersService {

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createUser (userData) {
        const { username, email, password, info } = userData;

        const existingUser = await this.getUserByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await this.prisma.user.create({
            data: {
                username, 
                email, 
                password: hashedPassword, 
                info
            },
        });
        return user;
    };
    
    async getUsers () {
        const users = await this.prisma.user.findMany({
            where: {
                deleted_at: null
            }
        });
        return users;
    };

    async getAllUsers () {
        const users = await this.prisma.user.findMany();
        return users;
    };
    
    async getUserById (userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        });
        return user;
    };

    async getUserByEmail (email) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    };
    
    async updateUser (userId, userData) {
        const { username, email, info } = userData;

        const updatedUser = await this.prisma.user.update({
            where: {
                id: parseInt(userId),
            },
            data: {
                username, 
                email,
                info,
                updated_at: new Date()
            },
        });
        return updatedUser;
    };

    async softDeleteUser (userId) {
        const softDeletedUser = await this.prisma.user.update({
            where: {
                id: parseInt(userId),
            },
            data: {
                deleted_at: new Date()
            },
        });

        return softDeletedUser;
    };

    async restoreUser (userId) {
        const restoredUser = await this.prisma.user.update({
            where: {
                id: parseInt(userId),
            },
            data: {
                deleted_at: null
            },
        });

        return restoredUser;
    };
    
    async deleteUser (userId) {
        const deletedUser = await this.prisma.user.delete({
            where: {
                id: parseInt(userId),
            },
        });
        return deletedUser;
    };

}

module.exports = new UsersService();