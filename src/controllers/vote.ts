import {getFetchFeeStats, SubmitVote} from "../services/stellar"
import Proposal from "../models/proposal"
import { Request, Response } from "express"
import vote from "../models/vote"

const submitVote = async (req:Request, res: Response) => {
    try {
        const {proposalId, voter, transactionId, amount} = req.body
        //await SubmitVote(secret, proposal?.publicKey)
         const newVote = new vote({
            proposal: proposalId,
            voter,
            transactionId,
            amount
         })
         await newVote.save()
        res.json({ message: 'Vote submitted successfully'})
    } catch (error) {
        console.log(error)
    }
}

export {
    submitVote,
}