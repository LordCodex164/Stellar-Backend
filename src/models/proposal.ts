import mongoose, { MongooseOptions, Mongoose, Document} from "mongoose";

interface ProposalDocument extends Document {
  hasExpired: () => boolean;
  deadline: Date;
  status:string;
}

const ProposalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
   publicKey: {
    type: String,
    required: true,
  },
  votes:{
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'funded', 'expired'],
    default: 'active'
  },
  deadline: {
    type: Number,  // Duration in hours, days, etc.
    required: true
  },
  creator: {
    type: String,  // This could be the user's Stellar public key
    required: true
  }
});

// ProposalSchema.methods.hasExpired = function () {
//   return new Date > this.deadline
// }

// ProposalSchema.pre("save", function(this:ProposalDocument, next) {
//   if(this.hasExpired() && this.status == "active"){
//     this.status = "expired"
//   }
//   next()
// })

 export default mongoose.model<ProposalDocument>('Proposal', ProposalSchema);