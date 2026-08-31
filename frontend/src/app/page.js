'use client';
import { useState } from 'react';
import { ethers } from 'ethers';

export default function Home() {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // ዋሌት የማገናኘት ፋንክሽን
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed", error);
      }
    } else {
      alert('እባክዎን MetaMask ወይም ሌላ Web3 Wallet ይጫኑ!');
    }
  };

  // ቶክን ዴፖዚት (Deposit) የማድረግ ፋንክሽን
  const handleDeposit = async () => {
    if (!account) {
      alert('እባክዎን መጀመሪያ Connect Wallet ይበሉ!');
      return;
    }
    if (!amount || amount <= 0) {
      alert('እባክዎን ትክክለኛ የገንዘብ መጠን ያስገቡ!');
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const tx = await signer.sendTransaction({
        to: account, 
        value: ethers.parseEther(amount.toString())
      });

      console.log("Transaction sent:", tx.hash);
      alert('ግብይቱ (Transaction) ተልኳል! እባክዎን በ MetaMask ያረጋግጡ።');
      await tx.wait();
      alert('ግብይቱ በሳኬት ተጠናቀቀ (Success)!');
      setLoading(false);
    } catch (error) {
      console.error("Deposit failed", error);
      alert('ዴፖዚቱ አልተሳካም: ' + (error.reason || error.message));
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-slate-900 text-white">
      <div className="w-full max-w-5xl flex justify-between items-center border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-blue-500">Crypto DEX Platform</h1>
        <button
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
        </button>
      </div>

      <div className="w-full max-w-md bg-slate-800 border border-gray-700 rounded-2xl p-6 shadow-2xl my-12 text-center">
        <h2 className="text-xl font-bold mb-4">Deposit & Stake Tokens</h2>
        <input
          type="number"
          placeholder="0.0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-slate-900 border border-gray-700 rounded-lg p-3 text-white mb-4 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleDeposit}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200 disabled:bg-gray-600"
        >
          {loading ? 'Processing...' : 'Deposit Tokens'}
        </button>
      </div>

      <footer className="text-sm text-gray-500">
        Crypto DEX Platform &copy; 2026
      </footer>
    </main>
  );
}