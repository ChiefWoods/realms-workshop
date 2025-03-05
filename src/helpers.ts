import { PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } from "@solana/web3.js";
import { getExplorerLink } from '@solana-developers/helpers';
import { CONNECTION, SPL_GOVERNANCE, WALLET } from "./constants";

export async function sendTx(ixs: TransactionInstruction[]) {
  const tx = new Transaction().add(...ixs);
  const sig = await sendAndConfirmTransaction(CONNECTION, tx, [WALLET]);
  console.log('SUCCESS:', getExplorerLink('tx', sig, 'devnet'));
}

export async function getAllDraftProposalPubkey(tokenOwnerRecord: PublicKey) {
  return (await SPL_GOVERNANCE.getProposalsByTokenOwnerRecord(tokenOwnerRecord))
    .filter(proposal => proposal.state.draft !== undefined)[0].publicKey;
}
}