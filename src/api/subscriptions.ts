import express from 'express';
import { prisma } from '../services/prisma';
import { summarizeCampaign } from '../services/llm';

const router = express.Router();

router.post('/', async (req, res) => {
  const { donorId, email, amount, currency, interval, campaignDescription } = req.body;
  if (!donorId || !email || !amount || !currency || !interval || !campaignDescription) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { tags, summary } = await summarizeCampaign(campaignDescription);

  const subscription = await prisma.subscription.create({
    data: {
      donorId,
      email,
      amount,
      currency,
      interval,
      campaignDescription,
      tags,
      summary
    }
  });

  res.json(subscription);
});

router.delete('/:donorId', async (req, res) => {
  const { donorId } = req.params;

  await prisma.subscription.delete({ where: { donorId } });
  res.json({ status: 'subscription cancelled' });
});

export default router;
