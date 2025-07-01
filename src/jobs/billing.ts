import { prisma } from '../services/prisma';

export function runBillingJob() {
  setInterval(async () => {
    const subscriptions = await prisma.subscription.findMany();
    const now = new Date();

    for (const sub of subscriptions) {
      const nextCharge = new Date(sub.lastCharged);
      nextCharge.setMonth(nextCharge.getMonth() + 1);

      if (now >= nextCharge) {
        await prisma.transaction.create({
          data: {
            provider: 'stripe',
            status: 'success',
            riskScore: 0.1,
            explanation: 'Recurring billing',
            amount: sub.amount,
            email: sub.email
          }
        });
        await prisma.subscription.update({
          where: { donorId: sub.donorId },
          data: { lastCharged: now }
        });
        console.log(`Charged donor ${sub.donorId} - ${sub.amount}`);
      }
    }
  }, 60000);
}
