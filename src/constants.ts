import { clusterApiUrl, Connection, Keypair, PublicKey } from '@solana/web3.js';
import { SplGovernance } from "governance-idl-sdk";

// Set Realms pubkey in .env.local

export const CONNECTION = new Connection(process.env.SOLANA_RPC_URL ?? clusterApiUrl('devnet'), 'confirmed');
export const WALLET = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.DEV_WALLET!)));
export const SPL_GOVERNANCE = new SplGovernance(CONNECTION)

export const REALMS_PUBKEY = new PublicKey(process.env.REALMS_PUBKEY!);
const REALMS = await SPL_GOVERNANCE.getRealmByPubkey(REALMS_PUBKEY);
export const COUNCIL_MINT = REALMS.config.councilMint;
export const COMMUNITY_MINT = REALMS.communityMint;

export const GOVERNANCE_PUBKEY = (await SPL_GOVERNANCE.getGovernanceAccountsByRealm(REALMS_PUBKEY))[0].publicKey;

const TOKEN_OWNER_RECORD_REALMS = (await SPL_GOVERNANCE.getTokenOwnerRecordsForOwner(WALLET.publicKey))
  .filter(tor => tor.realm.toBase58() === REALMS_PUBKEY.toBase58());
export const TOKEN_OWNER_RECORD_GOVERNANCE = TOKEN_OWNER_RECORD_REALMS
  .filter(tor => tor.governingTokenMint.toBase58() === COUNCIL_MINT.toBase58())[0].publicKey;
export const TOKEN_OWNER_RECORD_COMMUNITY = TOKEN_OWNER_RECORD_REALMS
  .filter(tor => tor.governingTokenMint.toBase58() === COMMUNITY_MINT.toBase58())[0].publicKey;
