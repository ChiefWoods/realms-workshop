import { GOVERNANCE_PUBKEY, REALMS_PUBKEY, SPL_GOVERNANCE, TOKEN_OWNER_RECORD_GOVERNANCE, WALLET } from "../constants";
import { getAllDraftProposalPubkey, getSignatoryRecordPubkey, sendTx } from "../helpers";

const tokenOwnerRecord = TOKEN_OWNER_RECORD_GOVERNANCE;
const proposalAccount = await getAllDraftProposalPubkey(tokenOwnerRecord);
const signatoryRecordAccount = await getSignatoryRecordPubkey(proposalAccount);

const ix = await SPL_GOVERNANCE.signOffProposalInstruction(
  REALMS_PUBKEY,
  GOVERNANCE_PUBKEY,
  proposalAccount,
  WALLET.publicKey,
  signatoryRecordAccount,
  tokenOwnerRecord
)

await sendTx([ix]);