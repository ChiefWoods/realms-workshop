import {
  GOVERNANCE_PUBKEY,
  REALMS_PUBKEY,
  SPL_GOVERNANCE,
  TOKEN_OWNER_RECORD_COMMUNITY,
  TOKEN_OWNER_RECORD_GOVERNANCE,
  WALLET,
} from "../constants";
import {
  getDraftProposalPubkey,
  getSignatoryRecordPubkey,
  sendTx,
} from "../helpers";

const isCommunityProposal = process.argv[2] === "true";
const tokenOwnerRecord = isCommunityProposal
  ? TOKEN_OWNER_RECORD_COMMUNITY
  : TOKEN_OWNER_RECORD_GOVERNANCE;
const proposalAccount = await getDraftProposalPubkey(tokenOwnerRecord);
const signatoryRecordAccount = await getSignatoryRecordPubkey(proposalAccount);

const ix = await SPL_GOVERNANCE.signOffProposalInstruction(
  REALMS_PUBKEY,
  GOVERNANCE_PUBKEY,
  proposalAccount,
  WALLET.publicKey,
  signatoryRecordAccount,
  tokenOwnerRecord,
);

await sendTx([ix]);
