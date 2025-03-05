import { COUNCIL_MINT, GOVERNANCE_PUBKEY, REALMS_PUBKEY, SPL_GOVERNANCE, TOKEN_OWNER_RECORD_GOVERNANCE, WALLET } from "../constants";
import { sendTx } from "../helpers";

const ix = await SPL_GOVERNANCE.createProposalInstruction(
  "proposal a",
  "desc",
  {
    choiceType: 'single',
    multiChoiceOptions: null,
  },
  ['test'],
  false,
  REALMS_PUBKEY,
  GOVERNANCE_PUBKEY,
  TOKEN_OWNER_RECORD_GOVERNANCE,
  COUNCIL_MINT,
  WALLET.publicKey, 
  WALLET.publicKey
);

await sendTx([ix]);