import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import typeDoctorRoutes from './routes/typeDoctorRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import logger from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use('/api/type-doctors', typeDoctorRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Type Doctors API running on port ${PORT}`);
});
