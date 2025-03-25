import { createBill, getBill, getBills, updateBill, deleteBill } from "../controllers/bill.controller.js";
import express from 'express';
import { authorizationAdmin, actionsMiddleware } from "../middleware/actionsMiddleware.js";

const billRouter = express.Router();

billRouter.use(actionsMiddleware);
billRouter.post('/bill', createBill);
billRouter.get('/bill', getBills);
billRouter.get('/bill/:id', getBill);
billRouter.put('/bill/:id', updateBill);
billRouter.delete('/bill/:id', deleteBill);

export default billRouter;