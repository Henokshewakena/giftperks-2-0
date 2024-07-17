"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  useAccount,
  useContract,
  useProvider,
  useSigner,
  useConnect,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const stakingAddress = "YOUR_CONTRACT_ADDRESS";
const stakingABI = [
  // Add your ABI here
];

const StakingPage = () => {
  const { ethers } = require("ethers");
  const { address, isConnected } = useAccount();
  // const { data } = useSigner();
  // const provider = useProvider();
  const { connect } = useConnect();
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  // const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [rewards, setRewards] = useState(0);
  const [stakeBalance, setStakeBalance] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [apyRate, setApyRate] = useState(20); // Example APY rate
  const [lockPeriod, setLockPeriod] = useState(7 * 24 * 60 * 60); // 7 days in seconds
  const [lockEndTime, setLockEndTime] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const contract = new ethers.Contract(stakingAddress, stakingABI, signer);
      // setProvider(provider);

      setSigner(signer);
      setContract(contract);
    };
    initWeb3();
  }, []);

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setHideConnectBtn(true);
      connect({ connector: injected({ target: "minipay" }) });
    }
  }, []);

  const updateBalances = async (account) => {
    const balance = await contract.getStake(account);
    const reward = await contract.calculateRewards(account);
    const totalStaked = await contract.totalStaked();
    const userStake = await contract.stakes(account);

    setStakeBalance(ethers.utils.formatEther(balance));
    setRewards(ethers.utils.formatEther(reward));
    setTotalStaked(ethers.utils.formatEther(totalStaked));
    setLockEndTime(userStake.timestamp.toNumber() + lockPeriod);
  };

  const handleStake = async () => {
    const tx = await contract.stake(ethers.utils.parseEther(stakeAmount));
    await tx.wait();
    updateBalances(account);
    setStakeAmount("");
  };

  const handleUnstake = async () => {
    const tx = await contract.withdrawStake();
    await tx.wait();
    updateBalances(account);
  };

  const handleClaimRewards = async () => {
    const tx = await contract.claimRewards();
    await tx.wait();
    updateBalances(account);
  };

  const formatTime = (seconds) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    // return { d };
    // d, { h };
    // h, { m };
    // m, { s };
    // s;
  };

  const timeLeft = lockEndTime
    ? lockEndTime - Math.floor(Date.now() / 1000)
    : 0;

  return (
    <div className="w-full h-screen">
      <h1 className="orange_gradient text-3xl font-bold mb-6">Staking</h1>
      {isConnected ? (
        <div>
          <div>
            <p>Staked Balance: {stakeBalance} Tokens</p>
            <p>Rewards: {rewards} Tokens</p>
          </div>
          <div className="flex md:flex-row flex-col md:gap-10 md:mb-5 mb-2">
            <div className="flex flex-col md:min-w-32 gap-2 border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 text-[12px] text-white rounded-xl px-4 py-2">
              <h2>Total value locked</h2>
              <h1>{totalStaked} Tokens</h1>
            </div>
            {/* <div className="flex flex-col md:min-w-32 gap-2 border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 text-[12px] text-white rounded-xl px-4 py-2">
          <h2>Points generated</h2>
        </div> */}
            <div className="flex flex-col md:min-w-32 gap-2 border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 text-[12px] text-white rounded-xl px-4 py-2">
              <h2>APY Rate</h2>
              <h1>{apyRate}%</h1>
            </div>
            {/* <div className="flex flex-col md:min-w-32 gap-2 border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 text-[12px] text-white rounded-xl px-4 py-2">
          <h2>stakers</h2>
          <h1>9,574</h1>
        </div> */}
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex md:w-1/2 px-3 py-3 md:flex-row md:gap-5 gap-2 border border-orange-300 rounded-lg ">
              <div className="flex flex-col mb-6">
                <h2 className="text-2xl font-semibold mb-2">Stake Tokens</h2>
                <div className="flex flex-col p-4 border rounded-lg shadow-sm">
                  <input
                    type="number"
                    placeholder="Enter amount to stake"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />

                  <Link
                    href="/"
                    className="orange_gradient mb-6 rounded-full border border-orange-300 py-1.5 px-5"
                  >
                    Claim
                  </Link>

                  <button
                    onClick={handleStake}
                    className="border mt-6 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl py-2 px-6 text-[12px] text-white"
                  >
                    Stake Tokens
                  </button>
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <h2 className="text-2xl font-semibold mb-2">Claim</h2>
                <div className="flex flex-col p-4 border rounded-lg shadow-sm">
                  <input
                    type="number"
                    placeholder="Enter amount to unstake"
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <Link
                    href="/"
                    className="orange_gradient mb-6 rounded-full border border-orange-300 py-1.5 px-5"
                  >
                    Claim
                  </Link>
                  <button
                    onClick={handleUnstake}
                    className="rounded-3xl mt-6 py-2 px-6 text-[12px] text-white bg-red-500 hover:bg-red-600"
                  >
                    Unstake Tokens
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-row md:w-1/2 px-3 py-3 md:flex-row md:gap-5 border border-orange-300 rounded-lg ">
              <h2 className="text-2xl font-semibold mb-2">Lock down Period</h2>
              <p>{formatTime(timeLeft)}</p>
            </div>
          </div>
        </div>
      ) : (
        <ConnectButton
          className="border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl py-2 px-6 text-[12px] text-white"
          showBalance={{
            smallScreen: true,
            largeScreen: false,
          }}
        />
      )}
    </div>
  );
};

export default StakingPage;
