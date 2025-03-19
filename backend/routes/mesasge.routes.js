import express from 'express';
import { sendMessage } from '../controllers/message.controller';

const router = express.Router();

router.post('/api/send/:id', protectRoute, sendMessage);

export default router; 