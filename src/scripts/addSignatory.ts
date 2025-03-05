import { SPL_GOVERNANCE, TOKEN_OWNER_RECORD_GOVERNANCE, WALLET } from "../constants";
import { getAllDraftProposalPubkey, sendTx } from "../helpers";

const tokenOwnerRecord = TOKEN_OWNER_RECORD_GOVERNANCE;
const proposalAccount = await getAllDraftProposalPubkey(tokenOwnerRecord);

const ix = await SPL_GOVERNANCE.addSignatoryInstruction(
  WALLET.publicKey,
  proposalAccount,
  tokenOwnerRecord,
  WALLET.publicKey,
  WALLET.publicKey
)

await sendTx([ix]);