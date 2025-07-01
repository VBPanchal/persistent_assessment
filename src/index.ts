import express from 'express';
import dotenv from 'dotenv';
import chargeRoutes from './api/charge';
import subscriptionRoutes from './api/subscriptions';
import { runBillingJob } from './jobs/billing';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/charge', chargeRoutes);
app.use('/subscriptions', subscriptionRoutes);

runBillingJob();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
