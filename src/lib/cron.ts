const cron = require('node-cron');
const Proposal = require('./models/Proposal');

// Run every hour
cron.schedule('0 * * * *', async () => {
  const expiredProposals = await Proposal.find({ status: 'active', deadline: { $lt: new Date() } });
  
  for (let proposal of expiredProposals) {
    proposal.status = 'expired';
    await proposal.save();
  }

  console.log(`Updated ${expiredProposals.length} expired proposals`);
});