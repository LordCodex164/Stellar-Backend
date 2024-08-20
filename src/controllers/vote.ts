import {getFetchFeeStats, SubmitVote} from "../services/stellar"
import Proposal from "../models/proposal"
import { Request, Response } from "express"
import vote from "../models/vote"

const submitVote = async (req:Request, res: Response) => {
    try {
        const {proposalId, voter, transactionId, amount} = req.body
        const proposal = await Proposal.findById(proposalId)
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }
        //@ts-ignore
        proposal.votes += 1
        await proposal.save()
        //await SubmitVote(secret, proposal?.publicKey)
         const newVote = new vote({
            proposal: proposalId,
            voter,
            transactionId,
            amount
         })
         await newVote.save()
            //increment the proposal votes count in the document by 1 after savin

        res.json({message: 'Vote submitted successfully'})
    } catch (error) {
        console.log(error)
    }
}

export {
    submitVote,
}