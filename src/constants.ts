import { clusterApiUrl, Connection, Keypair } from '@solana/web3.js';
import { SplGovernance } from "governance-idl-sdk";

export const CONNECTION = new Connection(process.env.SOLANA_RPC_URL ?? clusterApiUrl('devnet'), 'confirmed');
export const WALLET = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.DEV_WALLET!)));
export const SPL_GOVERNANCE = new SplGovernance(CONNECTION)
