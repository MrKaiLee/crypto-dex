'use client';
import { useState } from 'react';

export default function SwapPage() {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const handleSwap = () => {
    console.log("Swapping:", fromAmount);
    alert("Swap functionality is ready to be connected with router contract!");
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] text-white">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Swap Tokens</h2>
        
        {/* From Field */}
        <div className="bg-slate-800 p-3 rounded-xl mb-3">
          <span className="text-sm text-gray-400">You Pay</span>
          <input 
            type="number" 
            placeholder="0.0" 
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            className="w-full bg-transparent text-2xl outline-none mt-1 text-white"
          />
        </div>

        {/* To Field */}
        <div className="bg-slate-800 p-3 rounded-xl mb-4">
          <span className="text-sm text-gray-400">You Receive</span>
          <input 
            type="number" 
            placeholder="0.0" 
            value={toAmount}
            readOnly
            className="w-full bg-transparent text-2xl outline-none mt-1 text-yellow-400"
          />
        </div>

        <button 
          onClick={handleSwap}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl transition cursor-pointer"
        >
          Swap Now
        </button>
      </div>
    </div>
  );
}