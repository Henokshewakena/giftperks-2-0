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
