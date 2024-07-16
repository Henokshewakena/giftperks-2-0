ማኔ ቴቄል ፋሬስ (Богатство Троица), [7/16/2024 7:32 AM]
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

    console.log(Unlock Time: ${unlockTime});

    await lock.deployed();
    console.log(
        Lock with 0.0001 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}
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
    const GiftenMarketPlace = await ethers.getContractFactory("GiftenMarketPlace");
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

ማኔ ቴቄል ፋሬስ (Богатство Троица), [7/16/2024 7:32 AM]
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
    const giftenMarketPlaceForStaking = await GiftenMarketPlace.deploy("CUSD_TOKEN_ADDRESS");
    await giftenMarketPlaceForStaking.deployed();
    console.log("GiftenMarketPlace deployed to:", giftenMarketPlaceForStaking.address);

    // Deploy ReferralRewards
    const ReferralRewards = await ethers.getContractFactory("ReferralRewards");
    const referralRewards = await ReferralRewards.deploy(giftenToken.address, giftenMarketPlaceForStaking.address, "CUSD_TOKEN_ADDRESS");
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

ማኔ ቴቄል ፋሬስ (Богатство Троица), [7/16/2024 7:34 AM]
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";


describe("Smart Contract Tests", function () {
  let VipSubscription: any;
  let GiftenMarketPlace: any;
  let TokenManager: any;
  let VipMembership: any;
  let GiftenToken: any;
  let MiniPay: any;
  let CUSDT: any;
  let GiftCard: any;
  let ReferralRewards: any;
  let Staking: any;
  let Lock: any;

  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy contracts
    VipSubscription = await ethers.getContractFactory("VipSubscription");
    GiftenMarketPlace = await ethers.getContractFactory("GiftenMarketPlace");
    TokenManager = await ethers.getContractFactory("TokenManager");
    VipMembership = await ethers.getContractFactory("VipMembership");
    GiftenToken = await ethers.getContractFactory("GiftenToken");
    MiniPay = await ethers.getContractFactory("MiniPay");
    CUSDT = await ethers.getContractFactory("CUSDT");
    GiftCard = await ethers.getContractFactory("GiftCard");
    ReferralRewards = await ethers.getContractFactory("ReferralRewards");
    Staking = await ethers.getContractFactory("Staking");
    Lock = await ethers.getContractFactory("Lock");
  });

  it("Deploy VipSubscription Contract", async function () {
    const vipSubscription = await VipSubscription.deploy();
    await vipSubscription.deployed();
    expect(vipSubscription.address).to.properAddress;
  });

  it("Deploy GiftenMarketPlace Contract", async function () {
    const giftenMarketPlace = await GiftenMarketPlace.deploy();
    await giftenMarketPlace.deployed();
    expect(giftenMarketPlace.address).to.properAddress;
  });

  it("Deploy TokenManager Contract", async function () {
    const tokenManager = await TokenManager.deploy("CUSD_TOKEN_ADDRESS");
    await tokenManager.deployed();
    expect(tokenManager.address).to.properAddress;
  });

  it("Deploy VipMembership Contract", async function () {
    const vipMembership = await VipMembership.deploy(
      "SUPERFLUID_HOST_ADDRESS",
      "SUPERFLUID_CUSD_TOKEN_ADDRESS",
      GiftenMarketPlace.address,
      "CUSD_TOKEN_ADDRESS",
      VipSubscription.address
    );
    await vipMembership.deployed();
    expect(vipMembership.address).to.properAddress;
  });

  it("Deploy GiftenToken Contract", async function () {
    const giftenToken = await GiftenToken.deploy();
    await giftenToken.deployed();
    expect(giftenToken.address).to.properAddress;
  });

  it("Deploy MiniPay Contract", async function () {
    const miniPay = await MiniPay.deploy("INITIAL_OWNER_ADDRESS");
    await miniPay.deployed();
    expect(miniPay.address).to.properAddress;
  });

  it("Deploy CUSDT Contract", async function () {
    const cusdt = await CUSDT.deploy();
    await cusdt.deployed();
    expect(cusdt.address).to.properAddress;
  });

  it("Deploy GiftCard Contract", async function () {
    const giftCard = await GiftCard.deploy();
    await giftCard.deployed();
    expect(giftCard.address).to.properAddress;
  });

  it("Deploy ReferralRewards Contract", async function () {
    const referralRewards = await ReferralRewards.deploy(
      GiftenToken.address,
      GiftenMarketPlace.address,
      "CUSD_TOKEN_ADDRESS"
    );
    await referralRewards.deployed();
    expect(referralRewards.address).to.properAddress;
  });

  it("Deploy Staking Contract", async function () {
    const staking = await Staking.deploy(GiftenToken.address);
    await staking.deployed();
    expect(staking.address).to.properAddress;
  });

//   it("Deploy Lock Contract", async function () {
//     const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//     const SIXTY_SECS = 60;
//     const unlockTime = currentTimestampInSeconds + SIXTY_SECS;
//     const lockedAmount = ethers.utils.parseEther("0.0001");

//     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
//     await lock.deployed();
//     expect(lock.address).to.properAddress;
//   });
});