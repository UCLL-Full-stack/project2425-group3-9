/**
 * @swagger
 *   components:
 *    schemas:
 *      Workspace:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: The name of the workspace.
 *            profiles:
 *              type: object
 *              description: the profiles who work in this workspace.
 */

import express, { Request, Response, NextFunction } from 'express';
import workspaceService from '../service/workspace.service';
import { Role } from '../types';

const workspaceRouter = express.Router();



/**
 * @swagger
 * /workspaces:
 *   get:
 *     tags:
 *       - Workspaces
 *     security:
 *      - bearerAuth: []
 *     summary: Retrieves a list of all workspaces
 *     description: Returns an array of workspaces.
 *     responses:
 *       200:
 *         description: A JSON array of all workspaces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workspace'
 */
workspaceRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const workspaces = await workspaceService.getAllWorkspaces(username, role);
        res.status(200).json(workspaces);
    } catch (error) {
        next(error);
    }
});


export { workspaceRouter };