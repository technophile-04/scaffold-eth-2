"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address, AddressInput, InputBase } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [newGreeting, setGreeting] = useState("");
  const [counterAddress, setCounterAddress] = useState("");

  const { data: totalCounter } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "totalCounter",
  });

  const { data: userGreetingCounter, refetch: fetchUserGreetingCounter } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "userGreetingCounter",
    args: [counterAddress],
    // only fetch when user click read button
    query: { enabled: false },
  });

  const { writeContractAsync } = useScaffoldWriteContract("YourContract");

  const handleSetGreeting = async () => {
    try {
      await writeContractAsync({ functionName: "setGreeting", args: [newGreeting] });
    } catch (e) {
      console.log("Error setting greeting", e);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 flex flex-col items-center space-y-4">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          {/* Contract interaction card */}
          <div className="card w-96 bg-base-100 shadow-md">
            <div className="card-body space-y-4 p-6">
              <h2 className="card-title m-0">Interact using your Smart Wallet!</h2>
              <h2 className="text-lg m-0">Total Counter: {totalCounter?.toString() ?? 0}</h2>
              <div className="space-y-2">
                <h3 className="text-lg m-0">Set Greetings</h3>
                <InputBase value={newGreeting} onChange={setGreeting} placeholder="LTMS..." />
                <button className="btn btn-primary btn-sm" onClick={handleSetGreeting}>
                  Send
                </button>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg m-0">User Greeting Counter</h3>
                <AddressInput value={counterAddress} onChange={setCounterAddress} placeholder="ENS or Address" />
                <button className="btn btn-primary btn-sm" onClick={() => fetchUserGreetingCounter()}>
                  Read
                </button>
                <p className="m-0">Counter Value: {userGreetingCounter?.toString() ?? 0} </p>
              </div>
            </div>
          </div>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
