'use client';
import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-green-400 bg-green-950 px-3 py-1.5 rounded-full border border-green-800">
          {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'Connected'}
        </span>
        <button
          onClick={() => disconnect()}
          className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-lg transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-xs px-4 py-2 rounded-lg transition shadow-lg"
        >
          Connect Wallet
        </button>
      ))}
    </div>
  );
}