/**
 * @swagger
 *   components:
 *     schemas:
 *      Wage:
 *          type: object
 *          properties:
 *            total:
 *              type: integer
 *              description: The total amount of wage.
 *            amount:
 *              type: integer
 *              description: The amount of wage.
 *            seniority:
 *              type: integer
 *              description: The seniority of a user.
 *            bonus:
 *              type: integer
 *              description: The bonus amount of the wage.
 */

import express, { Request, Response, NextFunction } from 'express';
import wageService from '../service/wage.service';
import { Role } from '../types';

const wageRouter = express.Router();



/**
 * @swagger
 * /wages:
 *   get:
 *     tags:
 *       - Wages
 *     security:
 *      - bearerAuth: []
 *     summary: Retrieves a list of all wages
 *     description: Returns an array of wages.
 *     responses:
 *       200:
 *         description: A JSON array of all wages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wage'
 */
wageRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const wages = await wageService.getAllWages(username, role);
        res.status(200).json(wages);
    } catch (error) {
        next(error);
    }
});


export { wageRouter };