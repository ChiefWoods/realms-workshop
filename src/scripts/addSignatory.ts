import { SPL_GOVERNANCE, TOKEN_OWNER_RECORD_GOVERNANCE, WALLET } from "../constants";
import { getDraftProposalPubkey, sendTx } from "../helpers";

const tokenOwnerRecord = TOKEN_OWNER_RECORD_GOVERNANCE;
const proposalAccount = await getDraftProposalPubkey(tokenOwnerRecord);

const ix = await SPL_GOVERNANCE.addSignatoryInstruction(
  WALLET.publicKey,
  proposalAccount,
  tokenOwnerRecord,
  WALLET.publicKey,
  WALLET.publicKey
)

await sendTx([ix]);