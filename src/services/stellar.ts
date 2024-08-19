import StellarSdk, { Networks, StrKey } from "@stellar/stellar-sdk"
import WebSocket from "ws"

const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org")

// Set up WebSocket server
// const wss = new WebSocket.Server({ port: 8080 });

// //create a set
// const clients = new Set()

async function CreateProposal(title:string, description:string, amount:string) {
  try {
    const pair = StellarSdk.Keypair.random();
    await server.friendbot(pair.publicKey()).call();
    return {
      publicKey: pair.publicKey(),
      secret: pair.secret(),
    }
  } catch (error) {
    return {
      publicKey: "error gettibg publicKey",
      secret: "error getting secret"
    }
  }}
  
   async function SubmitVote(voterSecret?:string, proposalPublicKey?:string) {
    if (StrKey.isValidEd25519PublicKey(proposalPublicKey as string)) { 
      throw new Error("Invalid proposal Public Key")
    }
    const voter = StellarSdk.Keypair.fromSecret(voterSecret);
    let accountBalances = await server.accounts().accountId(proposalPublicKey).call();
    const fee = await server.fetchBaseFee()
    const networkPassphrase = Networks.TESTNET;
    const account = await server.loadAccount(proposalPublicKey);
    console.log(accountBalances.balances, "<<<accountbalances")
    console.log(voter, "<<<voter")
    const transaction = new StellarSdk.TransactionBuilder(account, {networkPassphrase: networkPassphrase, fee })
      // Add a payment operation to the transaction
      .addOperation(StellarSdk.Operation.payment({
        destination: proposalPublicKey,
        // The term native asset refers to lumens
        asset: StellarSdk.Asset.native(),
        // Specify 350.1234567 lumens. Lumens are divisible to seven digits past
        // the decimal. They are represented in JS Stellar SDK in string format
        // to avoid errors from the use of the JavaScript Number data structure.
        amount: '0.00001',
      }))
      .setTimeout(10)
      .build();
      transaction.sign(voter);
      try {
        const transactionResult = await server.submitTransaction(transaction);
        console.log(JSON.stringify(transactionResult, null, 2));
        console.log('\nSuccess! View the transaction at: ');
        console.log(transactionResult._links.transaction.href);
      } catch (e) {
        console.log('An error has occured:');
        console.log(e);
      }

  }

  async function fetchRecentPayments(publicKey:string, limit = 10) {
    const { records } = await server
      .payments()
      .forAccount(publicKey)
      .limit(limit)
      .order("desc")
      .call();
    return records;
  }

  //stream payment event

  function streamPaymentEvent() {
    console.log("Starting payment stream...");
    
    const es = server.payments()
      .cursor('now')
      .stream({
        onmessage: async function (payment:any) {
          // ... existing code ...
          console.log("hello test");
        },
        onerror: function (error:any) {
          console.log(error)
          console.error("Error in payment stream:", error);
          // Implement reconnection logic
          setTimeout(streamPaymentEvent, 5000);
        }
      });
  
    return es;
  }
  
  
   
  //getting secret using the public key

  async function getFetchFeeStats () {
    try {
      const feeStats = await server.feeStats();
      return feeStats
    } catch (error) {
      console.log(error)
    }
      
  }

export {
  CreateProposal,
  SubmitVote,
  getFetchFeeStats,
  fetchRecentPayments,
  streamPaymentEvent
}