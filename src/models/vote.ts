import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema({
    proposal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proposal',
      required: true
    },
    voter: {
      type: String,  // This would be the voter's Stellar public key
      required: true
    },
    transactionId: {
      type: String,
      required: true,
      unique: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });
  
  export default mongoose.model('Vote', VoteSchema);