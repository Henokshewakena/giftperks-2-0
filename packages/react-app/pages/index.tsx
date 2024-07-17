/* eslint-disable react-hooks/exhaustive-deps */
import PrimaryButton from "@/components/Button";
import { useWeb3 } from "@/contexts/useWeb3";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";

import Popup from "@/components/Popup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Home() {
  const {
    address,
    getUserAddress,
    sendCUSD,
    mintMinipayNFT,
    getNFTs,
    signTransaction,
  } = useWeb3();
  const [cUSDLoading, setCUSDLoading] = useState(false);
  const [nftLoading, setNFTLoading] = useState(false);
  const [signingLoading, setSigningLoading] = useState(false);
  const [userOwnedNFTs, setUserOwnedNFTs] = useState<string[]>([]);
  const [tx, setTx] = useState<any>(undefined);

  useEffect(() => {
    getUserAddress();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const tokenURIs = await getNFTs();
      setUserOwnedNFTs(tokenURIs);
    };
    if (address) {
      getData();
    }
  }, [address]);

  async function sendingCUSD() {
    if (address) {
      setSigningLoading(true);
      try {
        const tx = await sendCUSD(address, "0.1");
        setTx(tx);
      } catch (error) {
        console.log(error);
      } finally {
        setSigningLoading(false);
      }
    }
  }

  async function signMessage() {
    setCUSDLoading(true);
    try {
      await signTransaction();
    } catch (error) {
      console.log(error);
    } finally {
      setCUSDLoading(false);
    }
  }

  async function mintNFT() {
    setNFTLoading(true);
    try {
      const tx = await mintMinipayNFT();
      const tokenURIs = await getNFTs();
      setUserOwnedNFTs(tokenURIs);
      setTx(tx);
    } catch (error) {
      console.log(error);
    } finally {
      setNFTLoading(false);
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col">
      {!address && (
        <main className="flex min-h-screen flex-col items-center justify-between">
          <div className="flex flex-row justify-between md:gap-32 md:px-24 md:py-5 py-10 ">
            <div className="flex flex-col gap-6 md:w-2/5 justify-center">
              <p className="md:text-6xl orange_gradient text-3xl">
                Win Big With Our Exclusive Giveaways!
              </p>
              <p className="text-md md:text-lg font-light md:w-3/4">
                Don't miss your chance to win big!Enter now for exclusive prizes
                like NFTs
              </p>

              <div className="flex gap-4">
                <Link
                  href="/"
                  className="border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl md:py-2 md:px-6 px-3 py-2 md:text-[12px] text-white"
                >
                  Get your first Gift
                </Link>

                <Link
                  href="/business"
                  onClick={handleClickOpen}
                  className="border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl md:py-2 md:px-6 px-3 py-2 md:text-[12px] text-white"
                >
                  Sell Products
                </Link>

                <Dialog
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    component: "form",
                    onSubmit: (event: any) => {
                      event.preventDefault();
                      const formData = new FormData(event.currentTarget);
                      const formJson = Object.fromEntries(formData.entries());
                      const email = formJson.email;
                      console.log(email);
                      handleClose();
                    },
                  }}
                >
                  <DialogTitle>Create your business account</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="email"
                      label="Name"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="email"
                      name="email"
                      label="Email Address"
                      type="email"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} className="">
                      Cancel
                    </Button>
                    <Link
                      href="/business"
                      type="submit"
                      className="border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl md:py-2 md:px-6 px-3 py-2 md:text-[12px] text-white"
                    >
                      Create
                    </Link>
                  </DialogActions>
                </Dialog>
              </div>
            </div>

            <div className="flex flex-col gap-6 w-3/5">
              <Image
                src="/assets/images/gift-icon.png"
                alt="GiftPerks Logo"
                width={300}
                height={300}
                sizes="100vw"
                style={{ width: "100%" }}
                className="object-contain"
              />
            </div>
          </div>

          <div className=" ">
            <h1 className="orange_gradient text-3xl font-bold mb-6">Rewards</h1>
            <div className="flex flex-col md:flex-row md:items-center md:align-middle space-y-6 md:space-y-0 md:space-x-6">
              <div className="p-4 border border-orange-300 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">
                  How to Earn Tokens
                </h2>
                <p>
                  Tokens can be earned by participating in various activities on
                  our platform such as completing tasks, engaging in community
                  discussions, or referring new users. The more you participate,
                  the more tokens you can accumulate.
                </p>
              </div>
              <div className="p-4 border border-orange-300 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">Gift Cards</h2>
                <p>
                  Redeem your tokens for a variety of gift cards from popular
                  retailers. Simply accumulate the required number of tokens and
                  choose from our selection of gift cards to enjoy your rewards.
                </p>
              </div>
              <div className="p-4 border border-orange-300 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">NFTs</h2>
                <p>
                  Use your tokens to acquire exclusive NFTs available only to
                  our community members. These NFTs can represent unique digital
                  assets such as artwork, collectibles, and more. Start earning
                  tokens today and build your NFT collection!
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <h1 className="orange_gradient text-3xl font-bold mb-6">
              VIP Subscriptions
            </h1>
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
              <div className="p-4 border border-orange-300 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">VIP Bronze</h2>
                <p>
                  Enjoy basic VIP benefits including early access to new
                  features, priority customer support, and exclusive content.
                  Perfect for those who want to get started with our VIP
                  program.
                </p>
                <p className="text-lg font-bold mt-2">$9.99/month</p>
                <button className="mt-4 orange_gradient rounded-full border border-orange-300 py-1.5 px-5">
                  Subscribe Now
                </button>
              </div>
              <div className="p-4 border border-orange-300 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">VIP Silver</h2>
                <p>
                  Get all the benefits of Bronze plus additional perks such as
                  higher token earning rates, exclusive VIP events, and special
                  discounts on platform services.
                </p>
                <p className="text-lg font-bold mt-2">$19.99/month</p>
                <button className="mt-4 orange_gradient rounded-full border border-orange-300 py-1.5 px-5">
                  Subscribe Now
                </button>
              </div>
              <div className="p-4 border border-orange-300 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">VIP Gold</h2>
                <p>
                  Experience the ultimate VIP treatment with all the benefits of
                  Silver plus exclusive access to premium content, one-on-one
                  sessions with industry experts, and much more.
                </p>
                <p className="text-lg font-bold mt-2">$29.99/month</p>
                <button className="mt-4 border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl py-2 px-6 text-[12px] text-white">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
          {/* <Popup /> */}
        </main>
      )}
      {address && (
        <div className="h1">
          There you go... a canvas for your next Minipay project!
        </div>
      )}

      {address && (
        <>
          <div className="h2 text-center">
            Your address: <span className="font-bold text-sm">{address}</span>
          </div>
          {tx && (
            <p className="font-bold mt-4">
              Tx Completed: {(tx.transactionHash as string).substring(0, 6)}
              ...
              {(tx.transactionHash as string).substring(
                tx.transactionHash.length - 6,
                tx.transactionHash.length
              )}
            </p>
          )}
          <div className="w-full px-3 mt-7">
            <PrimaryButton
              loading={signingLoading}
              onClick={sendingCUSD}
              title="Send 0.1 cUSD to your own address"
              widthFull
            />
          </div>

          <div className="w-full px-3 mt-6">
            <PrimaryButton
              loading={cUSDLoading}
              onClick={signMessage}
              title="Sign a Message"
              widthFull
            />
          </div>

          {userOwnedNFTs.length > 0 ? (
            <div className="flex flex-col items-center justify-center w-full mt-7">
              <p className="font-bold">My NFTs</p>
              <div className="w-full grid grid-cols-2 gap-3 mt-3 px-2">
                {userOwnedNFTs.map((tokenURI, index) => (
                  <div
                    key={index}
                    className="p-2 border-[3px] border-colors-secondary rounded-xl"
                  >
                    <Image
                      alt="MINIPAY NFT"
                      src={tokenURI}
                      className="w-[160px] h-[200px] object-cover"
                      width={160}
                      height={200}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-5">You do not have any NFTs yet</div>
          )}

          <div className="w-full px-3 mt-5">
            <PrimaryButton
              loading={nftLoading}
              onClick={mintNFT}
              title="Mint Minipay NFT"
              widthFull
            />
          </div>
        </>
      )}
      <Popup />
    </div>
  );
}
