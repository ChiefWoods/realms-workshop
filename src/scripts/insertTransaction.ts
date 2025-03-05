import { LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
import { DAO_WALLET, GOVERNANCE_PUBKEY, SPL_GOVERNANCE, TOKEN_OWNER_RECORD_GOVERNANCE, WALLET } from "../constants";
import { getDraftProposalPubkey, sendTx } from "../helpers";

// Add and change instructions below

const transferIx = SystemProgram.transfer({
  fromPubkey: DAO_WALLET,
  toPubkey: WALLET.publicKey,
  lamports: LAMPORTS_PER_SOL / 10000,
})

const tokenOwnerRecord = TOKEN_OWNER_RECORD_GOVERNANCE;
const proposalAccount = await getDraftProposalPubkey(tokenOwnerRecord);

const ix = await SPL_GOVERNANCE.insertTransactionInstruction(
  [transferIx],
  0,
  0,
  0,
  GOVERNANCE_PUBKEY,
  proposalAccount,
  tokenOwnerRecord,
  WALLET.publicKey,
  WALLET.publicKey
)

await sendTx([ix]);