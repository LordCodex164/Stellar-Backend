import {getFetchFeeStats, SubmitVote} from "../services/stellar"
import Proposal from "../models/proposal"
import { Request, Response } from "express"
import vote from "../models/vote"

const submitVote = async (req:Request, res: Response) => {
    try {
        const {proposalId, voter, transactionId, amount} = req.body
        const proposal = await Proposal.findById(req.params.id)
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }
        //await SubmitVote(secret, proposal?.publicKey)
         await new vote({
            proposal: proposalId,
            voter,
            transactionId,
            amount
         })
        res.json({ message: 'Vote submitted successfully'})
    } catch (error) {
        console.log(error)
    }
}

export {
    submitVote,
}