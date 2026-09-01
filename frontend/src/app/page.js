'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAction = () => {
    setLoading(true);
    setTimeout(() => {
      alert('Action completed successfully!');
      setLoading(false);
      setAmount('');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col justify-between p-6">
      {/* 1. Header & Navigation */}
      <header className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-4 gap-4">
        <h1 className="text-2xl font-bold text-blue-400">Crypto DEX Platform</h1>
        
        {/* Navigation Tabs */}
        <div className="flex gap-2 bg-gray-900 p-1 rounded-lg border border-gray-800">
          <button 
            onClick={() => setActiveTab('deposit')} 
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'deposit' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Deposit & Stake
          </button>
          <button 
            onClick={() => setActiveTab('trade')} 
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'trade' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Trade
          </button>
          <button 
            onClick={() => setActiveTab('market')} 
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'market' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Market
          </button>
          <button 
            onClick={() => setActiveTab('history')} 
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            History
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-sm">
          Connect Wallet
        </button>
      </header>

      {/* 2. Main Content Area based on Selected Tab */}
      <section className="flex-grow flex items-center justify-center my-8">
        
        {/* Deposit / Stake Tab */}
        {activeTab === 'deposit' && (
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Deposit & Stake Tokens</h2>
            <input 
              type="number" 
              placeholder="0.0" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white mb-4 focus:outline-none focus:border-blue-500"
            />
            <button 
              onClick={handleAction}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? 'Processing...' : 'Deposit Tokens'}
            </button>
          </div>
        )}

        {/* Trade Tab */}
        {activeTab === 'trade' && (
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Swap / Trade Tokens</h2>
            <div className="mb-3">
              <label className="text-xs text-gray-400">You Pay</label>
              <input type="number" placeholder="0.0" className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white mt-1" />
            </div>
            <div className="mb-4">
              <label className="text-xs text-gray-400">You Receive</label>
              <input type="number" placeholder="0.0" className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white mt-1" />
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
              Swap Now
            </button>
          </div>
        )}

        {/* Market Tab */}
        {activeTab === 'market' && (
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl w-full max-w-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Market Trends</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-gray-950 p-3 rounded-lg border border-gray-800">
                <span>Ethereum (ETH)</span>
                <span className="text-green-400">$3,450.00 (+2.4%)</span>
              </div>
              <div className="flex justify-between items-center bg-gray-950 p-3 rounded-lg border border-gray-800">
                <span>Bitcoin (BTC)</span>
                <span className="text-green-400">$67,200.00 (+1.8%)</span>
              </div>
              <div className="flex justify-between items-center bg-gray-950 p-3 rounded-lg border border-gray-800">
                <span>Solana (SOL)</span>
                <span className="text-red-400">$142.50 (-0.6%)</span>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl w-full max-w-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
            <div className="text-gray-400 text-sm text-center py-8">
              No recent transactions found. Connect wallet to view history.
            </div>
          </div>
        )}

      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 border-t border-gray-800 pt-4">
        Crypto DEX Platform &copy; 2026
      </footer>
    </main>
  );
}