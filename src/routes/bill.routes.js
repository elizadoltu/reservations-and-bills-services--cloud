import { createBill, getBill, getBills, updateBill, deleteBill } from "../controllers/bill.controller.js";
import express from 'express';
import { authorizationAdmin, actionsMiddleware } from "../middleware/actionsMiddleware.js";

const billRouter = express.Router();

billRouter.post('/bill', authorizationAdmin, createBill);
billRouter.get('/bill', getBills);
billRouter.get('/bill/:id', getBill);
billRouter.put('/bill/:id', authorizationAdmin, updateBill);
billRouter.delete('/bill/:id', authorizationAdmin, deleteBill);

export default billRouter;