import {fetchRecentPayments as fetchRecentPayment} from "../services/stellar"
import { Request, Response } from "express"


const fetchRecentPayments = async (req:Request, res: Response) => {
    try {
       const records =  await fetchRecentPayment(req.params.id)
       res.status(200).json(records)
    } catch (error) {
        console.log(error)
    }
}

export {
    fetchRecentPayments
}

