import cron from 'node-cron';
import proposal from '../models/proposal';
// Run every hour

export function scheduleExpiredProposals() {
  cron.schedule('* * * * * *', async () => {
    const expiredProposals = await proposal.find({ status: 'active', deadline: { $lt: new Date() } });
    for (let proposal of expiredProposals) {
      proposal.status = 'expired';
      await proposal.save();
    }
  });
}