/**
 * @swagger
 *   components:
 *    schemas:
 *      Animal:
 *          type: object
 *          properties:
 *            firstname:
 *              type: string
 *              description: The first name of the animal.
 *            lastname:
 *              type: string
 *              description: The last name of the animal.
 *            age:
 *              type: integer
 *              description: The age of the animal in years.
 */

import express, { Request, Response, NextFunction } from 'express';
import animalService from '../service/animal.service';
import { Role } from '../types';

const animalRouter = express.Router();

export { animalRouter };

/**
 * @swagger
 * /animals:
 *   get:
 *     tags:
 *       - Animals
 *     security:
 *      - bearerAuth: []
 *     summary: Retrieves a list of all animals
 *     description: Returns an array of all animals in the system.
 *     responses:
 *       200:
 *         description: A JSON array of all animals.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 *       500:
 *         description: Internal server error.
 */
animalRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const animals = await animalService.getAllAnimals(username, role);
        res.status(200).json(animals);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /animals:
 *   post:
 *     tags:
 *       - Animals
 *     security:
 *      - bearerAuth: []
 *     summary: Add a new animal
 *     description: Adds a new animal to the list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The first name of the animal.
 *               lastname:
 *                 type: string
 *                 description: The last name of the animal.
 *               age:
 *                 type: integer
 *                 description: The age of the animal in years.
 *               userid:
 *                 type: integer
 *                 description: The id of a user.
 *     responses:
 *       200:
 *         description: Animal successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
animalRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const { firstname, lastname, age, userid } = req.body;
        const newAnimal = await animalService.addAnimal( {firstname, lastname, age} , userid, username, role);
        res.status(200).json(newAnimal);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /animals/{firstname}:
 *   delete:
 *     tags:
 *       - Animals
 *     security:
 *      - bearerAuth: []
 *     summary: Delete an animal by its first name
 *     description: Deletes an animal from the list using its first name.
 *     parameters:
 *       - name: firstname
 *         in: path
 *         required: true
 *         description: The first name of the animal to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Animal successfully deleted.
 *       404:
 *         description: Animal not found.
 *       500:
 *         description: Internal server error.
 */
animalRouter.delete('/:firstname', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const { firstname } = req.params;

        await animalService.deleteAnimal(firstname, username, role);

        res.status(200).json({ message: `Animal with firstname '${firstname}' successfully deleted.` });
    } catch (error) {
        next(error);
    }
});

