import cron from 'node-cron';
import proposal from '../models/proposal';
// Run every hour

export function scheduleExpiredProposals() {
  cron.schedule('*/5 * * * *', async () => {
    const expiredProposals = await proposal.find({ status: 'active', deadline: { $lt: new Date() } });
    console.log(`Found ${expiredProposals.length} expired proposals`);
    for (let proposal of expiredProposals) {
      proposal.status = 'expired';
      await proposal.save();
    }

    console.log(`Updated ${expiredProposals.length} expired proposals`);
  });
}
