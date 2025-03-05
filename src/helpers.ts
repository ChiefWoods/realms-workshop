import {
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { getExplorerLink } from "@solana-developers/helpers";
import { CONNECTION, SPL_GOVERNANCE, WALLET } from "./constants";

export async function sendTx(ixs: TransactionInstruction[]) {
  const tx = new Transaction().add(...ixs);
  const sig = await sendAndConfirmTransaction(CONNECTION, tx, [WALLET]);
  console.log("SUCCESS:", getExplorerLink("tx", sig, "devnet"));
}

export async function getDraftProposalPubkey(tokenOwnerRecord: PublicKey) {
  return (
    await SPL_GOVERNANCE.getProposalsByTokenOwnerRecord(tokenOwnerRecord)
  ).filter((proposal) => proposal.state.draft !== undefined)[0].publicKey;
}

export async function getSignatoryRecordPubkey(proposalAccount: PublicKey) {
  return (
    await SPL_GOVERNANCE.getSignatoryRecordsForProposal(proposalAccount)
  ).filter((sr) => sr.signatory.toBase58() === WALLET.publicKey.toBase58())[0]
    .publicKey;
}
