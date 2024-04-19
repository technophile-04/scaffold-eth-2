# 🏗 Coinbase Smart-Wallet SDK starter kit

~ Fork of [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2)

A fork of Scaffold-ETH 2 with [coinbase-sdk-wallet beta](https://github.com/coinbase/coinbase-wallet-sdk/) preconfigured which allows 4337 account abstraction using passkeys.


## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

**What's next**:

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`
- Edit your smart contract test in: `packages/hardhat/test`. To run test use `yarn hardhat:test`

## Showing coinbase smart wallet : 
When on local chain, Scaffold-ETH's burner wallet is shown instead of coinabse smart wallet. Since [coinbase beta sdk connector](https://github.com/coinbase/coinbase-wallet-sdk/blob/master/packages/wallet-sdk/docs/v4_with_wagmi.md) only works with base sepolia, it won't be shown on connect modal when `scaffold.config.ts` [targetNetworks](https://github.com/scaffold-eth/scaffold-eth-2/blob/10c13e58f8af3276115da907b4650fe3efe2d873/packages/nextjs/scaffold.config.ts#L13) doens't have `chains.baseSepolia` in it. 


Once you change `scaffold.config.ts` [targetNetworks](https://github.com/scaffold-eth/scaffold-eth-2/blob/10c13e58f8af3276115da907b4650fe3efe2d873/packages/nextjs/scaffold.config.ts#L13) with `targetNetworks: [chains.baseSepolia]` it will automatically be shown. 

For interacting with contracts, you nicely use [scaffold-eth custom hooks](https://docs.scaffoldeth.io/hooks/) (wrappers around wagmi) or wagmi hooks directly without needing to change anything. 

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
