import { ethers } from "hardhat";
const hre = require("hardhat");

async function main() {
  try {
    const miniPayNFT = await ethers.deployContract("MiniPay", [
      "0x0D6Dc2f182Eafa687090F95466d5368726C1ca45",
    ]);

    await miniPayNFT.waitForDeployment();

    console.log("Minipay NFT address - " + (await miniPayNFT.getAddress()));

    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const SIXTY_SECS = 60;
    const unlockTime = currentTimestampInSeconds + SIXTY_SECS;

    const lockedAmount = hre.ethers.utils.parseEther("0.0001");

    const Lock = await hre.ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    console.log(`UnlockTime: ${unlockTime}`);

    await lock.deployed();
    console.log(
      `Lock with 0.0001 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
    );

    // We require the Hardhat Runtime Environment explicitly here. This is optional
    // but useful for running the script in a standalone fashion through node <script>.
    //
    // You can also run a script with npx hardhat run <script>. If you do that, Hardhat
    // will compile your contracts, add the Hardhat Runtime Environment's members to the
    // global scope, and execute the script.

    // Deploy the VipSubscription contract
    const VipSubscription = await ethers.getContractFactory("VipSubscription");
    const vipSubscription = await VipSubscription.deploy();
    await vipSubscription.deployed();
    console.log("VipSubscription deployed to:", vipSubscription.address);

    // Deploy the GiftenMarketPlace contract
    const GiftenMarketPlace = await ethers.getContractFactory(
      "GiftenMarketPlace"
    );
    const giftenMarketPlace = await GiftenMarketPlace.deploy();
    await giftenMarketPlace.deployed();
    console.log("GiftenMarketPlace deployed to:", giftenMarketPlace.address);

    // Deploy the TokenManager contract
    const TokenManager = await ethers.getContractFactory("TokenManager");
    const tokenManager = await TokenManager.deploy("CUSD_TOKEN_ADDRESS"); // replace with actual cUSD token address
    await tokenManager.deployed();
    console.log("TokenManager deployed to:", tokenManager.address);

    // Deploy the VipMembership contract
    const VipMembership = await ethers.getContractFactory("VipMembership");
    const vipMembership = await VipMembership.deploy(
      "SUPERFLUID_HOST_ADDRESS", // replace with actual Superfluid host address
      "SUPERFLUID_CUSD_TOKEN_ADDRESS", // replace with actual Superfluid cUSD token address
      giftenMarketPlace.address,
      "CUSD_TOKEN_ADDRESS", // replace with actual cUSD token address
      vipSubscription.address
    );
    await vipMembership.deployed();
    console.log("VipMembership deployed to:", vipMembership.address);

    // Set the marketplace contract address in the VipMembership contract
    await giftenMarketPlace.setVipMembershipContract(vipMembership.address);
    console.log("VipMembership contract address set in GiftenMarketPlace");

    // Set the VipMembership contract address in the VipSubscription contract
    await vipSubscription.setVipMembershipContract(vipMembership.address);
    console.log("VipMembership contract address set in VipSubscription");

    // Set the TokenManager address in the VipMembership contract if needed
    // Uncomment and add a function in VipMembership if needed to link TokenManager
    // await vipMembership.setTokenManagerContract(tokenManager.address);
    // console.log("TokenManager contract address set in VipMembership");

    // Deploy the GiftenToken contract
    const GiftenToken = await ethers.getContractFactory("GiftenToken");
    const giftenToken = await GiftenToken.deploy();
    await giftenToken.deployed();
    console.log("GiftenToken deployed to:", giftenToken.address);

    // Deploy the MiniPay contract
    const MiniPay = await ethers.getContractFactory("MiniPay");
    const miniPay = await MiniPay.deploy("INITIAL_OWNER_ADDRESS"); // replace with actual initial owner address
    await miniPay.deployed();
    console.log("MiniPay deployed to:", miniPay.address);

    // Deploy the CUSDT contract
    const CUSDT = await ethers.getContractFactory("CUSDT");
    const cusdt = await CUSDT.deploy();
    await cusdt.deployed();
    console.log("CUSDT deployed to:", cusdt.address);

    // Deploy the GiftCard contract
    const GiftCard = await ethers.getContractFactory("GiftCard");
    const giftCard = await GiftCard.deploy();
    await giftCard.deployed();
    console.log("GiftCard deployed to:", giftCard.address);

    // Deploy GiftenMarketPlace (if not already deployed in previous steps)
    // Replace with actual cUSD token address for GiftenMarketPlace deployment
    const giftenMarketPlaceForStaking = await GiftenMarketPlace.deploy(
      "CUSD_TOKEN_ADDRESS"
    );
    await giftenMarketPlaceForStaking.deployed();
    console.log(
      "GiftenMarketPlace deployed to:",
      giftenMarketPlaceForStaking.address
    );

    // Deploy ReferralRewards
    const ReferralRewards = await ethers.getContractFactory("ReferralRewards");
    const referralRewards = await ReferralRewards.deploy(
      giftenToken.address,
      giftenMarketPlaceForStaking.address,
      "CUSD_TOKEN_ADDRESS"
    );
    await referralRewards.deployed();
    console.log("ReferralRewards deployed to:", referralRewards.address);

    // Deploy Staking
    const Staking = await ethers.getContractFactory("Staking");
    const staking = await Staking.deploy(giftenToken.address); // Assuming staking token is GiftenToken
    await staking.deployed();
    console.log("Staking deployed to:", staking.address);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
