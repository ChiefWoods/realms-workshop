# Realms Workshop

Realms scripts developed for Bountython Developer Workshop.

[Source Repository](https://github.com/ChiefWoods/realms-workshop)

## Built With

### Languages

- [![TypeScript](https://img.shields.io/badge/TypeScript-ffffff?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

### Libraries

- [@coral-xyz/anchor](https://www.anchor-lang.com/)
- [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/)
- [@solana-developers/helpers](https://github.com/solana-developers/helpers)
- [governance-idl-sdk](https://github.com/Mythic-Project/governance-sdk)

### Runtime

- [![Bun](https://img.shields.io/badge/Bun-000?style=for-the-badge&logo=bun)](https://bun.sh/)

## Getting Started

### Prerequisites

Update your Solana CLI, Bun toolkit to the latest version

```bash
solana-install update
bun upgrade
```

### Setup

1. Clone the repository

```bash
git clone https://github.com/ChiefWoods/realms-workshop.git
```

2. Install all dependencies

```bash
bun install
```

3. Set env values

```bash
cp .env.example .env.local
```

### Scripts

Make sure a [Realm DAO](https://app.realms.today/realms?cluster=devnet) is created with the address in `DEV_WALLET` set as a council member and `DEV_WALLET` is funded with devnet SOL.

Example of running an individual script:

```bash
bun src/scripts/createProposal.ts "<PROPOSAL_NAME>" "<PROPOSAL_DESCRIPTION>"
```

Running the main script to create a proposal, add wallet as signatory and sign off in a single transaction:

```bash
bun src/scripts/main.ts "<PROPOSAL_NAME>" "<PROPOSAL_DESCRIPTION>"
```

## Issues

View the [open issues](https://github.com/ChiefWoods/realms-workshop/issues) for a full list of proposed features and known bugs.

## Acknowledgements

### Resources

- [Shields.io](https://shields.io/)

## Contact

[chii.yuen@hotmail.com](mailto:chii.yuen@hotmail.com)
