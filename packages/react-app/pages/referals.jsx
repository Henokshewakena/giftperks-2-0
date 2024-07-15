"use client";

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const refferals = [
  createData("referal1", "email@example.com", "Premium", 1000),
  createData("cryptowhale", "email@example.com", "VIP", 5000),
  createData("oldfriend1", "email@example.com", "Premium", 2000),
  createData("fam", "email@example.com", "Basic", 50),
  createData("collegue", "email@example.com", "Premium", 1500),
];

// table names
function createData(name, email, level, points) {
  return { name, email, level, points };
}

const ReferralPage = () => {
  const [email, setEmail] = useState("");

  const handleInvite = () => {
    // Add invite logic here
    console.log(`Invited ${email}`);
  };

  const handleCopyLink = () => {
    // Add copy link logic here
    const referralLink = "https://example.com/referral";
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  return (
    <div className="w-full">
      <h1 className="orange_gradient text-3xl font-bold mb-6">
        Referral Program
      </h1>
      <div className="flex flex-col md:flex-row md:gap-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Invite Friends</h2>
          <div className="p-4 border border-orange-500 rounded-lg shadow-sm">
            <input
              type="email"
              placeholder="Enter friend's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={handleInvite}
              className="border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl py-2 px-6 text-[12px] text-white"
            >
              Invite Friend
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Friends List</h2>
          <div className="border border-orange-500 rounded-lg space-y-4">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Level</TableCell>
                    <TableCell align="right">Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {refferals.map((refferal) => (
                    <TableRow
                      key={refferal.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className="p-4 border border-orange-300 rounded-lg shadow-sm"
                    >
                      <TableCell component="th" scope="row">
                        {refferal.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {refferal.email}
                      </TableCell>
                      <TableCell align="right">{refferal.level}</TableCell>
                      <TableCell align="right">{refferal.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <button
            onClick={handleCopyLink}
            className="mt-4 border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl py-2 px-6 text-[12px] text-white"
          >
            Copy Referral Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
