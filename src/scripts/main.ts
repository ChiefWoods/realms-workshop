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

const proposalName = process.argv[2];
const proposalDesc = process.argv[3];
const isCommunityProposal = process.argv[4] === "true";

const proposalSeed = WALLET.publicKey;
const tokenOwnerRecord = isCommunityProposal
  ? TOKEN_OWNER_RECORD_COMMUNITY
  : TOKEN_OWNER_RECORD_GOVERNANCE;
const governingTokenMint = isCommunityProposal ? COMMUNITY_MINT : COUNCIL_MINT;

const proposalAccount = SPL_GOVERNANCE.pda.proposalAccount({
  governanceAccount: GOVERNANCE_PUBKEY,
  governingTokenMint,
  proposalSeed,
}).publicKey;

const createProposalIx = await SPL_GOVERNANCE.createProposalInstruction(
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
  tokenOwnerRecord,
  governingTokenMint,
  WALLET.publicKey,
  WALLET.publicKey,
  proposalSeed,
  isCommunityProposal
    ? SPL_GOVERNANCE.pda.voteRecordAccount({
        proposal: proposalAccount,
        tokenOwnerRecord,
      }).publicKey
    : undefined,
);

const addSignatoryIx = await SPL_GOVERNANCE.addSignatoryInstruction(
  WALLET.publicKey,
  proposalAccount,
  tokenOwnerRecord,
  WALLET.publicKey,
  WALLET.publicKey,
);

const signatoryRecordAccount = SPL_GOVERNANCE.pda.signatoryRecordAccount({
  proposal: proposalAccount,
  signatory: WALLET.publicKey,
}).publicKey;

const signOffProposalIx = await SPL_GOVERNANCE.signOffProposalInstruction(
  REALMS_PUBKEY,
  GOVERNANCE_PUBKEY,
  proposalAccount,
  WALLET.publicKey,
  signatoryRecordAccount,
  tokenOwnerRecord,
);

await sendTx([createProposalIx, addSignatoryIx, signOffProposalIx]);
