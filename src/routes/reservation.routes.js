import { createReservation, getReservations, getReservation, updateReservation, deleteReservation } from "../controllers/reservation.controller.js";
import { actionsMiddleware } from "../middleware/actionsMiddleware.js";
import express from 'express';

const reservationRouter = express.Router();

reservationRouter.use(actionsMiddleware);
reservationRouter.post('/reservation', createReservation);
reservationRouter.get('/reservation', getReservations);
reservationRouter.get('/reservation/:id', getReservation);
reservationRouter.put('/reservation/:id', updateReservation);
reservationRouter.delete('/reservation/:id', deleteReservation);

export default reservationRouter;