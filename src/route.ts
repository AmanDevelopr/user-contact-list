import { Router } from 'express';
import { userRouter} from './controller';

const router = Router();
router.use('/user-contacts-list', userRouter);
/**
 * @swagger
 * securityDefinitions:
 *   APIKeyHeader:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 */
export default router;