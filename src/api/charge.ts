import express from 'express';
import Stripe from 'stripe';
import { evaluateRisk } from '../services/fraudEvaluator';
import { generateExplanation } from '../services/llm';
import { prisma } from '../services/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });
const router = express.Router();

router.post('/', async (req, res) => {
  const { amount, email, source } = req.body;
  if (!amount || !email || !source) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const riskScore = evaluateRisk(amount, email);
  const explanation = await generateExplanation(amount, email, riskScore);

  if (riskScore >= 0.5) {
    return res.status(403).json({ status: 'blocked', riskScore, explanation });
  }

  try {
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source,
      description: `Charge for ${email}`
    });

    const transaction = await prisma.transaction.create({
      data: {
        provider: 'stripe',
        status: charge.status,
        riskScore,
        explanation,
        amount,
        email
      }
    });

    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Stripe error', details: err });
  }
});

export default router;
