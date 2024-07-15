import React, { useEffect, useState } from "react";
import Popup from "@/components/Popup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAccount } from "wagmi";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: "$100",
    img: "/assets/images/gift-box.png",
    description: "Description of product 1",
  },
  {
    id: 2,
    name: "Product 2",
    price: "$150",
    img: "/assets/images/gift-box.png",
    description: "Description of product 2",
  },
  {
    id: 3,
    name: "Product 3",
    price: "$200",
    img: "/assets/images/gift-box.png",
    description: "Description of product 3",
  },
  // Add more products here
];

const business = () => {
  const { address } = useAccount();

  const [companyName, setCompanyName] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [companyProducts, setcompanyProducts] = useState("");

  const [walletBalance, setWalletBalance] = useState(0);

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  return (
    <div className="flex w=full">
      <div className="border border-orange-300 rounded-lg shadow-sm p-5 mb-6">
        <button
          type="button"
          onClick={handleClickOpenCreate}
          className="mt-4 mb-4 border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl py-2 px-6 text-[12px] text-white"
        >
          Create
        </button>

        {/* create product dialog */}

        <Dialog
          open={openCreate}
          onClose={handleCloseCreate}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          <DialogTitle>Create Product</DialogTitle>
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
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCreate} className="">
              Cancel
            </Button>
            <Button
              type="submit"
              // add logic
              className="border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl md:py-2 md:px-6 px-3 py-2 md:text-[12px] text-white"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-orange-500 p-4 rounded-2xl shadow-sm"
            >
              <h2 className="text-lg font-bold">{product.name}</h2>
              <Image src={product.img} width={150} height={170} />
              <p>{product.description}</p>
              <p className="text-xl font-bold">${product.price}</p>
              {/* vip user gets discount */}
              {product.discount && (
                <p className="text-orange-500">{product.discount}</p>
              )}

              <div>
                <h2>Edit</h2>
                <button
                  type="button"
                  onClick={handleClickOpenEdit}
                  className="border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl py-2 px-6 text-[12px] text-white"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
          {/* edit product dialog */}
          <Dialog
            open={openEdit}
            onClose={handleCloseEdit}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const email = formJson.email;
                console.log(email);
                handleCloseEdit();
              },
            }}
          >
            <DialogTitle>Edit Product</DialogTitle>
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
                id="description"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit} className="">
                Cancel
              </Button>
              <Button
                type="submit"
                // edit logic
                className="border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl md:py-2 md:px-6 px-3 py-2 md:text-[12px] text-white"
              >
                Edit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default business;
