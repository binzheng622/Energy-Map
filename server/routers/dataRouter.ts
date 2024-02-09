import express, { Request, Response } from 'express';
import powerController from '../controllers/powerController.js';

const router = express.Router();

//fetch power data for input state
router.post(
  '/:state',
  powerController.loadState,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.stateData);
  }
);

export default router;
