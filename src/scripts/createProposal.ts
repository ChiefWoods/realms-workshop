import {
  COMMUNITY_MINT,
  COUNCIL_MINT,
  GOVERNANCE_PUBKEY,
  REALMS_PUBKEY,
  SPL_GOVERNANCE,
  TOKEN_OWNER_RECORD_COMMUNITY,
  TOKEN_OWNER_RECORD_GOVERNANCE,
  WALLET,
} from "../constants";
import { sendTx } from "../helpers";

// creating council vote type proposal as council

const proposalName = process.argv[2];
const proposalDesc = process.argv[3];
const isCommunityProposal = process.argv[4] === "true";

const ix = await SPL_GOVERNANCE.createProposalInstruction(
  proposalName,
  proposalDesc,
  {
    choiceType: "single",
    multiChoiceOptions: null,
  },
  ["test"],
  false,
  REALMS_PUBKEY,
  GOVERNANCE_PUBKEY,
  isCommunityProposal
    ? TOKEN_OWNER_RECORD_COMMUNITY
    : TOKEN_OWNER_RECORD_GOVERNANCE,
  isCommunityProposal ? COMMUNITY_MINT : COUNCIL_MINT,
  WALLET.publicKey,
  WALLET.publicKey,
);

await sendTx([ix]);
