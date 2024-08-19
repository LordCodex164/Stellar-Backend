"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProposal = CreateProposal;
exports.SubmitVote = SubmitVote;
exports.getFetchFeeStats = getFetchFeeStats;
exports.fetchRecentPayments = fetchRecentPayments;
exports.streamPaymentEvent = streamPaymentEvent;
const stellar_sdk_1 = __importStar(require("@stellar/stellar-sdk"));
const server = new stellar_sdk_1.default.Horizon.Server("https://horizon-testnet.stellar.org");
// Set up WebSocket server
// const wss = new WebSocket.Server({ port: 8080 });
// //create a set
// const clients = new Set()
function CreateProposal(title, description, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pair = stellar_sdk_1.default.Keypair.random();
            yield server.friendbot(pair.publicKey()).call();
            return {
                publicKey: pair.publicKey(),
                secret: pair.secret(),
            };
        }
        catch (error) {
            return {
                publicKey: "error gettibg publicKey",
                secret: "error getting secret"
            };
        }
    });
}
function SubmitVote(voterSecret, proposalPublicKey) {
    return __awaiter(this, void 0, void 0, function* () {
        if (stellar_sdk_1.StrKey.isValidEd25519PublicKey(proposalPublicKey)) {
            throw new Error("Invalid proposal Public Key");
        }
        const voter = stellar_sdk_1.default.Keypair.fromSecret(voterSecret);
        let accountBalances = yield server.accounts().accountId(proposalPublicKey).call();
        const fee = yield server.fetchBaseFee();
        const networkPassphrase = stellar_sdk_1.Networks.TESTNET;
        const account = yield server.loadAccount(proposalPublicKey);
        console.log(accountBalances.balances, "<<<accountbalances");
        console.log(voter, "<<<voter");
        const transaction = new stellar_sdk_1.default.TransactionBuilder(account, { networkPassphrase: networkPassphrase, fee })
            // Add a payment operation to the transaction
            .addOperation(stellar_sdk_1.default.Operation.payment({
            destination: proposalPublicKey,
            // The term native asset refers to lumens
            asset: stellar_sdk_1.default.Asset.native(),
            // Specify 350.1234567 lumens. Lumens are divisible to seven digits past
            // the decimal. They are represented in JS Stellar SDK in string format
            // to avoid errors from the use of the JavaScript Number data structure.
            amount: '0.00001',
        }))
            .setTimeout(10)
            .build();
        transaction.sign(voter);
        try {
            const transactionResult = yield server.submitTransaction(transaction);
            console.log(JSON.stringify(transactionResult, null, 2));
            console.log('\nSuccess! View the transaction at: ');
            console.log(transactionResult._links.transaction.href);
        }
        catch (e) {
            console.log('An error has occured:');
            console.log(e);
        }
    });
}
function fetchRecentPayments(publicKey_1) {
    return __awaiter(this, arguments, void 0, function* (publicKey, limit = 10) {
        const { records } = yield server
            .payments()
            .forAccount(publicKey)
            .limit(limit)
            .order("desc")
            .call();
        return records;
    });
}
//stream payment event
function streamPaymentEvent() {
    console.log("Starting payment stream...");
    const es = server.payments()
        .cursor('now')
        .stream({
        onmessage: function (payment) {
            return __awaiter(this, void 0, void 0, function* () {
                // ... existing code ...
                console.log("hello test");
            });
        },
        onerror: function (error) {
            console.log(error);
            console.error("Error in payment stream:", error);
            // Implement reconnection logic
            setTimeout(streamPaymentEvent, 5000);
        }
    });
    return es;
}
//getting secret using the public key
function getFetchFeeStats() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const feeStats = yield server.feeStats();
            return feeStats;
        }
        catch (error) {
            console.log(error);
        }
    });
}
