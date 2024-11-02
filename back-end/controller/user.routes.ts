/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            username:
 *              type: string
 *              description: user name.
 *            password:
 *              type: string
 *              description: user password.
 *            admin:
 *              type: boolean
 *              description: admin or user.
 *            profile:
 *              type: object
 *              description: user profile.
 *            address:
 *              type: object
 *              description: user address.
 *            workspace:
 *              type: object
 *              description: user workspace.
 *            wage:
 *              type: object
 *              description: user wage.
 *            animals:
 *              type: object
 *              description: user assigned animals.
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

export { userRouter };

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieves a list of all users
 *     description: Returns an array of users.
 *     responses:
 *       200:
 *         description: A JSON array of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/users'
 */
userRouter.get('/', async (req: Request, res: Response) => {
    // try {
    const users = userService.getAllUsers();
    res.status(200).json(users);
    // } catch (error) {
    //     res.status(400).json({ status: "error", errorMessage: error.message});
    // }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: user object.
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 */

userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const user = await userService.getUserById(id);
    res.status(200).json(user);
});
