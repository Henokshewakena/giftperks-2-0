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
import { InjectedConnector } from "wagmi/connectors/injected";

const stakingAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
const stakingABI = [
  // Replace with your contract ABI
];

const StakingPage = () => {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const [contract, setContract] = useState(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [rewards, setRewards] = useState(0);
  const [stakeBalance, setStakeBalance] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [apyRate, setApyRate] = useState(20); // Example APY rate
  const [lockPeriod, setLockPeriod] = useState(7 * 24 * 60 * 60); // 7 days in seconds
  const [lockEndTime, setLockEndTime] = useState(null);

  useEffect(() => {
    if (signer) {
      const contractInstance = new ethers.Contract(stakingAddress, stakingABI, signer);
      setContract(contractInstance);
    }
  }, [signer]);

  const connectWallet = async () => {
    try {
      await connect();
      if (address) {
        await updateBalances(address);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const updateBalances = async (account) => {
    try {
      const balance = await contract.getStake(account);
      const reward = await contract.calculateRewards(account);
      const totalStaked = await contract.totalStaked();
      const userStake = await contract.stakes(account);

      setStakeBalance(ethers.utils.formatEther(balance));
      setRewards(ethers.utils.formatEther(reward));
      setTotalStaked(ethers.utils.formatEther(totalStaked));
      setLockEndTime(userStake.timestamp.toNumber() + lockPeriod);
    } catch (error) {
      console.error("Failed to update balances:", error);
    }
  };

  const handleStake = async () => {
    try {
      const tx = await contract.stake(ethers.utils.parseEther(stakeAmount));
      await tx.wait();
      await updateBalances(address);
      setStakeAmount("");
    } catch (error) {
      console.error("Failed to stake:", error);
    }
  };

  const handleUnstake = async () => {
    try {
      const tx = await contract.withdrawStake();
      await tx.wait();
      await updateBalances(address);
    } catch (error) {
      console.error("Failed to unstake:", error);
    }
  };

  const handleClaimRewards = async () => {
    try {
      const tx = await contract.claimRewards();
      await tx.wait();
      await updateBalances(address);
    } catch (error) {
      console.error("Failed to claim rewards:", error);
    }
  };

  const formatTime = (seconds) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
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
            <div className="flex flex-col md:min-w-32 gap-2 border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 text-[12px] text-white rounded-xl px-4 py-2">
              <h2>APY Rate</h2>
              <h1>{apyRate}%</h1>
            </div>
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
                                     <button
                    onClick={handleStake}
                    className="border mt-6 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl py-2 px-6 text-[12px] text-white"
                  >
                    Stake Tokens
                  </button>
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <h2 className="text-2xl font-semibold mb-2">Unstake Tokens</h2>
                <div className="flex flex-col p-4 border rounded-lg shadow-sm">
                  <input
                    type="number"
                    placeholder="Enter amount to unstake"
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
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
          <button
            onClick={handleClaimRewards}
            className="border mt-6 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl py-2 px-6 text-[12px] text-white"
          >
            Claim Rewards
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="border mt-6 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl py-2 px-6 text-[12px] text-white"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default StakingPage;
