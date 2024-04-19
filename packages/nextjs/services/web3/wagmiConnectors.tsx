import { coinbaseSdkWallet } from "./coinbase-sdk-beta-connector/coinabseSdkBetaConnector";
import { burnerWalletConfig } from "./wagmi-burner/burnerWalletConfig";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import * as chains from "viem/chains";
import scaffoldConfig from "~~/scaffold.config";

const { onlyLocalBurnerWallet, targetNetworks } = scaffoldConfig;

const wallets = [
  coinbaseSdkWallet,
  ...(!targetNetworks.some(network => network.id !== (chains.hardhat as chains.Chain).id) || !onlyLocalBurnerWallet
    ? [burnerWalletConfig]
    : []),
];

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets,
    },
  ],
  {
    appName: "scaffold-eth-2",
    projectId: scaffoldConfig.walletConnectProjectId,
  },
);
