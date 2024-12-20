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
import { Role, UserInput } from '../types';


const userRouter = express.Router();

export { userRouter };

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *      - bearerAuth: []
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
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const users = await userService.getAllUsers(username, role);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *      - bearerAuth: []
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
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const id = parseInt(req.params.id);
        const user = await userService.getUserById(id, username, role);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/updateWage:
 *   put:
 *     tags:
 *       - Users
 *     security:
 *      - bearerAuth: []
 *     summary: Update the wage of a user
 *     description: Updates the wage of a user specified by the ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the user whose wage will be updated.
 *               wage:
 *                 type: object
 *                 properties:
 *                   amount:
 *                     type: number
 *                     description: The base wage amount.
 *                   seniority:
 *                     type: number
 *                     description: The seniority of the user.
 *                   bonus:
 *                     type: number
 *                     description: The bonus the user receives.
 *     responses:
 *       200:
 *         description: User's wage updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request data or user not found.
 */
userRouter.put('/updateWage', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const { id, wage } = req.body;
        const updatedUser = await userService.updateWage(id, wage, username, role);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * paths:
 *   /users/login:
 *     post:
 *       tags:
 *         - Users
 *       summary: Authenticate a user and return a token or session details.
 *       description: Validates user credentials and returns an authentication token or session details upon successful login.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - username
 *                 - password
 *               properties:
 *                 username:
 *                   type: string
 *                   example: john_doe
 *                   description: The username of the user.
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: John123
 *                   description: The password of the user.
 *       responses:
 *         '200':
 *           description: Successful authentication.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Authentication successful
 *                   token:
 *                     type: string
 *                     example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       username:
 *                         type: string
 *                         example: john_doe
 *                       email:
 *                         type: string
 *                         example: john@example.com
*/
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({
            message: 'Authentication successful',
            token: response.token,
            username: response.username, 
            role: response.role, 
        });
        } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: The created user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userInput: UserInput = req.body; 
      const user = await userService.createUser(userInput);
      res.status(200).json(user);
    } catch (error) {
      next(error);  
    }
});