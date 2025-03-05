import {
  SPL_GOVERNANCE,
  TOKEN_OWNER_RECORD_COMMUNITY,
  TOKEN_OWNER_RECORD_GOVERNANCE,
  WALLET,
} from "../constants";
import { getDraftProposalPubkey, sendTx } from "../helpers";

const isCommunityProposal = process.argv[2] === "true";
const tokenOwnerRecord = isCommunityProposal
  ? TOKEN_OWNER_RECORD_COMMUNITY
  : TOKEN_OWNER_RECORD_GOVERNANCE;
const proposalAccount = await getDraftProposalPubkey(tokenOwnerRecord);

const ix = await SPL_GOVERNANCE.addSignatoryInstruction(
  WALLET.publicKey,
  proposalAccount,
  tokenOwnerRecord,
  WALLET.publicKey,
  WALLET.publicKey,
);

await sendTx([ix]);
