
import {CreateProposal, SubmitVote, streamPaymentEvent} from "../services/stellar"
import Proposal from "../models/proposal"
import {Request, Response } from "express"

const createProposal = async (req:Request, res: Response) => {
    try {
        const {title, description, amount, publicKey, deadlineMinutes} = req.body
        //const {publicKey, secret} = await CreateProposal(title, description, amount)
        const deadline = new Date(Date.now() + deadlineMinutes * 60000); // Convert minutes to milliseconds
        const proposal = new Proposal({
            title,
            description,
            amount,
            publicKey,
            deadline,
            creator: publicKey
        })
        await proposal.save()
        res.status(200).json(proposal)
    } catch (error) {
        console.log(error)
    }
}

const getAllProposal = async (req:Request, res: Response) => {
    try {
        const proposals = await Proposal.find();
        res.json(proposals);
      } catch (error:any) {
        res.status(500).json({ message: error.message });
      }
}

const getProposalByCreator = async (req:Request, res: Response) => {
  const {id} = req.params
  console.log(id)
    try {
      const proposal = await Proposal.find({creator: id});
      console.log(proposal)
      if (!proposal) {
        return res.status(404).json({ message: 'Proposal not found' });
      }
      res.json(proposal);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const deleteProposal = async (req:Request, res: Response) => {
    console.log("params", req.params)
    try {
      const proposal = await Proposal.findByIdAndDelete(req.params.id);
      if (!proposal) {
        return res.status(404).json({ message: 'Proposal not found' });
      }
      res.json(proposal);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };

  export {
    createProposal,
    getProposalByCreator,
    getAllProposal,
    deleteProposal
  }