// /**
//  * @swagger
//  *   components:
//  *    schemas:
//  *      Animal:
//  *          type: object
//  *          properties:
//  *            firstname:
//  *              type: string
//  *              description: The first name of the animal.
//  *            lastname:
//  *              type: string
//  *              description: The last name of the animal.
//  *            age:
//  *              type: integer
//  *              description: The age of the animal in years.
//  */

// import express, { Request, Response, NextFunction } from 'express';
// import animalService from '../service/animal.service';

// const animalRouter = express.Router();

// export { animalRouter };

// /**
//  * @swagger
//  * /animals:
//  *   get:
//  *     summary: Retrieves a list of all animals
//  *     description: Returns an array of all animals in the system.
//  *     responses:
//  *       200:
//  *         description: A JSON array of all animals.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Animal'
//  *       500:
//  *         description: Internal server error.
//  */
// animalRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const animals = animalService.getAllAnimals();
//         res.status(200).json(animals);
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /animals:
//  *   post:
//  *     summary: Add a new animal
//  *     description: Adds a new animal to the list.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               firstname:
//  *                 type: string
//  *                 description: The first name of the animal.
//  *               lastname:
//  *                 type: string
//  *                 description: The last name of the animal.
//  *               age:
//  *                 type: integer
//  *                 description: The age of the animal in years.
//  *     responses:
//  *       200:
//  *         description: Animal successfully added.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Animal'
//  *       400:
//  *         description: Invalid input data.
//  *       500:
//  *         description: Internal server error.
//  */
// animalRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { firstname, lastname, age } = req.body;

//         if (!firstname || !lastname || typeof age !== 'number') {
//             return res.status(400).json({ error: 'Invalid data provided' });
//         }

//         const newAnimal = animalService.addAnimal({ firstname, lastname, age });
//         res.status(200).json(newAnimal);
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /animals/{firstname}:
//  *   delete:
//  *     summary: Delete an animal by its first name
//  *     description: Deletes an animal from the list using its first name.
//  *     parameters:
//  *       - name: firstname
//  *         in: path
//  *         required: true
//  *         description: The first name of the animal to delete.
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Animal successfully deleted.
//  *       404:
//  *         description: Animal not found.
//  *       500:
//  *         description: Internal server error.
//  */
// animalRouter.delete('/:firstname', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { firstname } = req.params;

//         if (!firstname) {
//             return res.status(400).json({ error: 'Firstname is required.' });
//         }

//         const deletedAnimal = animalService.deleteAnimal(firstname);

//         if (!deletedAnimal) {
//             return res.status(404).json({ error: 'Animal not found.' });
//         }

//         res.status(200).json({ message: `Animal with firstname '${firstname}' successfully deleted.` });
//     } catch (error) {
//         next(error);
//     }
// });

