import { sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
import { getExplorerLink } from '@solana-developers/helpers';
import { CONNECTION, WALLET } from "./constants";

export async function sendTx(tx: Transaction) {
  const sig = await sendAndConfirmTransaction(CONNECTION, tx, [WALLET]);
  console.log('SUCCESS:', getExplorerLink('tx', sig, 'devnet'));
}