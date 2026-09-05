'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
  // Auth & Account States (Custodial Auth Gate)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // General Dashboard States
  const [activeTab, setActiveTab] = useState('home');
  const [marketSubTab, setMarketSubTab] = useState('crypto');
  const [chartTimeframe, setChartTimeframe] = useState('15m');
  // Modal & Interactive States
  const [modalType, setModalType] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');

  // Trading Form States (For Trade Page)
  const [orderType, setOrderType] = useState('limit');
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradePrice, setTradePrice] = useState('78,020.31');

  // Futures Specific States
  const [leverage, setLeverage] = useState(20);
  const [futuresMarginType, setFuturesMarginType] = useState('Cross');
  const [futuresAmount, setFuturesAmount] = useState('');

  // Assets / Wallet States
  const [spotBalance, setSpotBalance] = useState(8250.40);
  const [futuresBalance, setFuturesBalance] = useState(4200.40);

  // Advanced Deposit & Withdraw States
  const [selectedWalletCoin, setSelectedWalletCoin] = useState(null);
  const [depositStep, setDepositStep] = useState('select'); // 'select' | 'address'
  const [withdrawStep, setWithdrawStep] = useState('select'); // 'select' | 'form'
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // ================= NEW FULL FEATURE STATES =================
  // Convert States
  const [convertFromCoin, setConvertFromCoin] = useState({ symbol: 'USDT', name: 'TetherUS', balance: 8250.40 });
  const [convertToCoin, setConvertToCoin] = useState({ symbol: 'BTC', name: 'Bitcoin', price: 78020.31 });
  const [convertAmount, setConvertAmount] = useState('');
  const [isSelectingFrom, setIsSelectingFrom] = useState(true);

  // Earn States
  const [selectedEarnPlan, setSelectedEarnPlan] = useState(null);
  const [earnStakeAmount, setEarnStakeAmount] = useState('');

  // P2P States
  const [p2pType, setP2pType] = useState('buy'); // 'buy' | 'sell'
  const [p2pSelectedMerchant, setP2pSelectedMerchant] = useState(null);
  const [p2pFiatAmount, setP2pFiatAmount] = useState('');

  // Transfer & Pay States
  const [transferRecipient, setTransferRecipient] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [payTarget, setPayTarget] = useState('');
  const [payAmount, setPayAmount] = useState('');

  // Live Fundamental News State
  const [newsList, setNewsList] = useState([
    { id: 1, category: 'CRYPTO', title: 'Bitcoin Surges Past Key Resistance as Institutional Inflows Hit Record Highs', time: '2 mins ago', source: 'Bloomberg Crypto' },
    { id: 2, category: 'STOCKS', title: 'Tech Stocks Rally: Nasdaq Reaches New Milestone Amid AI Chip Demand', time: '14 mins ago', source: 'Wall Street Journal' },
    { id: 3, category: 'FOREX / MACRO', title: 'Federal Reserve Signals Steady Interest Rates as Inflation Cools Down', time: '35 mins ago', source: 'Reuters Financial' }
  ]);

  // Live Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Price Alert: BTC', desc: 'Bitcoin crossed $78,000 resistance level successfully.', time: '1m ago' },
    { id: 2, title: 'Order Filled', desc: 'Your limit buy order for 0.5 BTC at $78,020 has been executed.', time: '10m ago' }
  ]);

  // Comprehensive Crypto List with full addresses
  const [cryptoList, setCryptoList] = useState([
    { 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      network: 'Bitcoin Network', 
      depositAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      rawPrice: 78020.31, 
      price: '78,020.31', 
      change: '-0.70%', 
      high24h: '79,250.00', 
      low24h: '77,510.00', 
      volBTC: '13,272.65', 
      volUSDT: '1.04B', 
      ma7: '78,081.43', 
      ma25: '78,028.61', 
      ma99: '78,515.17',
      orderBookBuy: '24.92%',
      orderBookSell: '75.08%',
      bidPrice: '78,020.30',
      askPrice: '78,020.31',
      candles: [
        { open: 78600, high: 78750, low: 78300, close: 78400, green: false },
        { open: 78400, high: 78500, low: 78100, close: 78150, green: false },
        { open: 78150, high: 78200, low: 77800, close: 77900, green: false },
        { open: 77900, high: 78100, low: 77600, close: 78020, green: true }
      ]
    },
    { 
      name: 'Ethereum', 
      symbol: 'ETH', 
      network: 'Ethereum (ERC20)', 
      depositAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      rawPrice: 2470.79, 
      price: '2,470.79', 
      change: '+1.94%', 
      high24h: '2,520.00', 
      low24h: '2,410.00', 
      volBTC: '8,420.10', 
      volUSDT: '410M', 
      ma7: '2,465.10', 
      ma25: '2,450.00', 
      ma99: '2,400.00',
      orderBookBuy: '58.40%',
      orderBookSell: '41.60%',
      bidPrice: '2,470.75',
      askPrice: '2,470.80',
      candles: [
        { open: 2420, high: 2440, low: 2410, close: 2435, green: true },
        { open: 2435, high: 2460, low: 2430, close: 2455, green: true }
      ]
    },
    { 
      name: 'TetherUS', 
      symbol: 'USDT', 
      network: 'Tron (TRC20)', 
      depositAddress: 'TYJ9K8g7M6N3PqX5ZrW4V2bC1F8xY9tB3mDj5',
      rawPrice: 1.00, 
      price: '1.00', 
      change: '0.00%', 
      high24h: '1.00', 
      low24h: '1.00', 
      volBTC: '5,100.00', 
      volUSDT: '2.5B', 
      ma7: '1.00', 
      ma25: '1.00', 
      ma99: '1.00',
      orderBookBuy: '50.00%',
      orderBookSell: '50.00%',
      bidPrice: '1.00',
      askPrice: '1.00',
      candles: [
        { open: 1, high: 1, low: 1, close: 1, green: true },
        { open: 1, high: 1, low: 1, close: 1, green: true }
      ]
    },
    { 
      name: 'Solana', 
      symbol: 'SOL', 
      network: 'Solana Network', 
      depositAddress: 'SolanaValidator99xJk83mN2pQrStUvWxYz123456',
      rawPrice: 185.40, 
      price: '185.40', 
      change: '+5.42%', 
      high24h: '190.00', 
      low24h: '174.20', 
      volBTC: '3,120.00', 
      volUSDT: '820M', 
      ma7: '182.10', 
      ma25: '179.50', 
      ma99: '170.00',
      orderBookBuy: '65.20%',
      orderBookSell: '34.80%',
      bidPrice: '185.35',
      askPrice: '185.40',
      candles: [
        { open: 178, high: 186, low: 177, close: 185.4, green: true }
      ]
    }
  ]);

  const [selectedMarketCoin, setSelectedMarketCoin] = useState(cryptoList[0]);

  // P2P Merchant Dummy List
  const p2pMerchants = [
    { id: 1, name: 'CryptoKing_ET', orders: '1280', completion: '99.4%', price: '124.50', limit: '5,000 - 150,000 ETB', methods: ['Telebirr', 'CBE'] },
    { id: 2, name: 'HabeshaFastPay', orders: '840', completion: '98.1%', price: '124.80', limit: '2,000 - 50,000 ETB', methods: ['Telebirr', 'Awash Bank'] },
    { id: 3, name: 'AddisTrader99', orders: '412', completion: '100%', price: '125.10', limit: '10,000 - 300,000 ETB', methods: ['CBE', 'Dashen Bank'] }
  ];

  // Earn Products List
  const earnProducts = [
    { id: 1, coin: 'USDT', name: 'Flexible Earn', apy: '12.5%', type: 'Flexible', risk: 'Low' },
    { id: 2, coin: 'BTC', name: 'Bitcoin Locked Staking', apy: '5.2%', type: '30 Days', risk: 'Low' },
    { id: 3, coin: 'ETH', name: 'Ethereum 2.0 Staking', apy: '6.8%', type: 'Flexible', risk: 'Medium' },
    { id: 4, coin: 'SOL', name: 'Solana High Yield', apy: '8.4%', type: '60 Days', risk: 'Medium' }
  ];

  // LIVE PRICE TICKER SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoList(prevList => 
        prevList.map(coin => {
          if (coin.symbol === 'USDT') return coin;
          const diff = (Math.random() * 2 - 0.98);
          const newRaw = coin.rawPrice + diff;
          return {
            ...coin,
            rawPrice: newRaw,
            price: newRaw.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            bidPrice: (newRaw - 0.01).toFixed(2),
            askPrice: newRaw.toFixed(2)
          };
        })
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updated = cryptoList.find(c => c.symbol === selectedMarketCoin.symbol);
    if (updated) setSelectedMarketCoin(updated);
  }, [cryptoList]);

  const filteredCryptos = cryptoList.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Trade Execution
  const handleExecuteTrade = (actionType) => {
    if (!tradeAmount || parseFloat(tradeAmount) <= 0) {
      alert('እባክዎ ትክክለ�?መጠ�?ያስገቡ!');
      return;
    }
    setModalType('success');
  };

  // Handle Futures Execution
  const handleExecuteFutures = (positionType) => {
    if (!futuresAmount || parseFloat(futuresAmount) <= 0) {
      alert('እባክዎ የኅዳግ (Margin) መጠ�?ያስገቡ!');
      return;
    }
    setModalType('success');
  };

  // Copy Address Functionality with Green feedback
  const handleCopyAddress = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  // Handle Withdraw Submission
  const handleWithdrawSubmit = () => {
    if (!withdrawAddress) {
      alert('እባክዎ የመድረ�?አድራሻ (Address) ያስገቡ!');
      return;
    }
    const val = parseFloat(withdrawAmount);
    if (!val || val <= 0) {
      alert('እባክዎ ትክክለ�?የገንዘ�?መጠ�?ያስገቡ!');
      return;
    }
    if (val > spotBalance) {
      alert('በቂ ቀ�?ሒሳ�?የለዎት�?');
      return;
    }
    setSpotBalance(prev => prev - val);
    setWithdrawAddress('');
    setWithdrawAmount('');
    setModalType('success');
  };

  // Handle Convert Submit
  const handleConvertSubmit = () => {
    const val = parseFloat(convertAmount);
    if (!val || val <= 0) {
      alert('እባክዎ ትክክለ�?የመቀየሪ�?መጠ�?ያስገቡ!');
      return;
    }
    setSpotBalance(prev => prev + 5);
    setConvertAmount('');
    setModalType('success');
  };

  // Handle Earn Stake Submit
  const handleEarnSubmit = () => {
    const val = parseFloat(earnStakeAmount);
    if (!val || val <= 0) {
      alert('እባክዎ ለማስቀመጥ የሚፈልጉት�?መጠ�?ያስገቡ!');
      return;
    }
    setEarnStakeAmount('');
    setModalType('success');
  };

  // Handle P2P Submit
  const handleP2PSubmit = () => {
    const val = parseFloat(p2pFiatAmount);
    if (!val || val <= 0) {
      alert('እባክዎ ትክክለ�?የገንዘ�?መጠ�?ያስገቡ!');
      return;
    }
    setP2pFiatAmount('');
    setModalType('success');
  };

  // Handle Transfer Submit
  const handleTransferSubmit = () => {
    if (!transferRecipient || !transferAmount) {
      alert('እባክዎ ሁሉንም መረጃዎ�?ይሙ�?');
      return;
    }
    setTransferRecipient('');
    setTransferAmount('');
    setModalType('success');
  };

  // Handle Pay Submit
  const handlePaySubmit = () => {
    if (!payTarget || !payAmount) {
      alert('እባክዎ የክፍያ መረጃው�?በትክክ�?ያስገቡ!');
      return;
    }
    setPayTarget('');
    setPayAmount('');
    setModalType('success');
  };
if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#121418] flex items-center justify-center p-4">
        <div className="bg-[#1a1d24] p-8 rounded-2xl w-full max-w-md border border-gray-800 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-400 text-sm">
              {isSignUp ? 'Sign up to access your trading dashboard' : 'Sign in to your trading platform account'}
            </p>
          </div>

         <form onSubmit={(e) => {
            e.preventDefault();
            if (!email || !password) {
              alert('እባክዎ ኢሜ�?እና ፓስወር�?ያስገቡ!');
              return;
            }
            console.log('New User Auth Captured:', { email, password, type: isSignUp ? 'Sign Up' : 'Sign In' });
            setIsAuthenticated(true);
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#121418] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f0b90b]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••�?
                className="w-full bg-[#121418] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f0b90b]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#f0b90b] hover:bg-[#fcd535] text-black font-semibold py-3 rounded-lg transition-colors cursor-pointer mt-2"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-[#f0b90b] hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#181a20] text-gray-200 min-h-screen pb-28 selection:bg-[#f0b90b] selection:text-black font-sans relative text-xs">
      
      {/* ================= 1. HOME PAGE VIEW ================= */}
      {activeTab === 'home' && (
        <div className="p-4 space-y-5 animate-fadeIn pb-20">
          <div className="flex justify-between items-center py-2 border-b border-[#2b313a]">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#f0b90b] flex items-center justify-center text-black font-bold">B</div>
              <span className="font-bold text-lg text-white tracking-wide">CryptoDEX</span><ConnectButton />
            </div>
            <div className="flex space-x-4 text-lg">
              <span onClick={() => setModalType('search')} className="cursor-pointer" title="Search">🔍</span>
              <span onClick={() => setModalType('support')} className="cursor-pointer" title="Support">🎧</span>
              <span onClick={() => setModalType('notifications')} className="cursor-pointer relative" title="Notifications">
                💬
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              </span>
            </div>
          </div>

          <div onClick={() => setModalType('search')} className="bg-[#2b313a]/50 border border-[#2b313a] rounded-xl px-4 py-3 flex items-center space-x-2 text-gray-400 cursor-pointer">
            <span>🔍</span>
            <span className="text-xs">Search coin, stock, forex or market...</span>
          </div>

          {/* QUICK FEATURES GRID */}
          <div className="grid grid-cols-6 gap-2 bg-[#2b313a]/20 p-3 rounded-2xl border border-[#2b313a] text-center">
            <div onClick={() => setModalType('earnModal')} className="flex flex-col items-center cursor-pointer space-y-1 hover:opacity-80">
              <div className="w-10 h-10 rounded-xl bg-[#0ecb81]/20 text-[#0ecb81] flex items-center justify-center text-base font-bold">🌱</div>
              <span className="text-[10px] font-bold text-gray-300">Earn</span>
            </div>
            <div onClick={() => setModalType('convertModal')} className="flex flex-col items-center cursor-pointer space-y-1 hover:opacity-80">
              <div className="w-10 h-10 rounded-xl bg-[#f0b90b]/20 text-[#f0b90b] flex items-center justify-center text-base font-bold">🔄</div>
              <span className="text-[10px] font-bold text-gray-300">Convert</span>
            </div>
            <div onClick={() => setModalType('p2pModal')} className="flex flex-col items-center cursor-pointer space-y-1 hover:opacity-80">
              <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/20 text-[#3b82f6] flex items-center justify-center text-base font-bold">🤝</div>
              <span className="text-[10px] font-bold text-gray-300">P2P</span>
            </div>
            <div onClick={() => setModalType('transferModal')} className="flex flex-col items-center cursor-pointer space-y-1 hover:opacity-80">
              <div className="w-10 h-10 rounded-xl bg-[#9333ea]/20 text-[#9333ea] flex items-center justify-center text-base font-bold">💸</div>
              <span className="text-[10px] font-bold text-gray-300">Transfer</span>
            </div>
            <div onClick={() => setModalType('payModal')} className="flex flex-col items-center cursor-pointer space-y-1 hover:opacity-80">
              <div className="w-10 h-10 rounded-xl bg-[#ec4899]/20 text-[#ec4899] flex items-center justify-center text-base font-bold">💳</div>
              <span className="text-[10px] font-bold text-gray-300">Pay</span>
            </div>
            <div onClick={() => setModalType('moreModal')} className="flex flex-col items-center cursor-pointer space-y-1 hover:opacity-80">
              <div className="w-10 h-10 rounded-xl bg-gray-700/40 text-white flex items-center justify-center text-base font-bold">🎛�?/div>
              <span className="text-[10px] font-bold text-gray-300">More</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#2b313a]/80 to-[#181a20] border border-[#2b313a] p-4 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Est. Total Value (USDT)</p>
              <h2 className="text-2xl font-black text-white mt-1">
                { address ? (spotBalance + futuresBalance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00' }
                <span className="text-xs text-[#0ecb81] font-normal ml-1">+$340.20 (+2.8%)</span>
              </h2>
            </div>
            <button onClick={() => setActiveTab('trade')} className="bg-[#f0b90b] hover:bg-[#d9a70a] text-black text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer">
              Trade Now
            </button>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-[#f0b90b] flex items-center space-x-2">
                <span>�?/span>
                <span>Global Crypto & Stock Fundamental News</span>
              </h3>
              <span className="text-[10px] bg-[#0ecb81]/20 text-[#0ecb81] px-2 py-0.5 rounded font-mono font-bold">�?LIVE FEED</span>
            </div>

            <div className="space-y-2">
              {newsList.map((news) => (
                <div key={news.id} className="bg-[#2b313a]/30 border border-[#2b313a] p-3.5 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="bg-[#f0b90b]/10 text-[#f0b90b] px-2 py-0.5 rounded font-bold">{news.category}</span>
                    <span className="text-gray-400">{news.source} �?{news.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-relaxed">{news.title}</h4>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm text-gray-200">Hot Cryptos (Live Prices)</h3>
              <span onClick={() => setActiveTab('markets')} className="text-xs text-[#f0b90b] cursor-pointer hover:underline">Open Chart &gt;</span>
            </div>
            <div className="space-y-2">
              {cryptoList.map((coin, i) => (
                <div key={i} onClick={() => { setSelectedMarketCoin(coin); setActiveTab('markets'); }} className="flex justify-between items-center bg-[#2b313a]/30 p-3 rounded-xl cursor-pointer hover:bg-[#2b313a]/60">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#f0b90b]/20 text-[#f0b90b] flex items-center font-bold justify-center text-xs">{coin.symbol[0]}</div>
                    <div>
                      <h4 className="text-white font-semibold text-xs">{coin.symbol} <span className="text-gray-500 font-normal">/USDT</span></h4>
                      <span className="text-xs text-gray-300 font-mono font-bold">{coin.price}</span>
                    </div>
                  </div>
                  <div className="bg-[#0ecb81]/20 text-[#0ecb81] px-2.5 py-1 rounded-lg text-xs font-bold">{coin.change}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. MARKETS & ADVANCED CHART VIEW ================= */}
      {activeTab === 'markets' && (
        <div className="space-y-1 pb-20">
          <div className="flex justify-between items-center px-3 py-2.5 bg-[#181a20] border-b border-[#2b313a] sticky top-0 z-30">
            <div className="flex items-center space-x-2">
              <span 
                onClick={() => setActiveTab('home')} 
                className="text-gray-400 hover:text-white cursor-pointer text-lg font-bold px-1"
                title="Back to Home"
              >
                �?
              </span>
              <span className="font-bold text-white text-sm tracking-wide">{selectedMarketCoin.symbol}/USDT</span>
              <span onClick={() => setModalType('search')} className="text-[10px] bg-[#2b313a] text-gray-300 px-1.5 py-0.5 rounded cursor-pointer">�?Change</span>
            </div>
            <div className="flex items-center space-x-4 text-base">
              <span onClick={() => setModalType('search')} className="cursor-pointer">�?/span>
              <span onClick={() => setModalType('notifications')} className="cursor-pointer relative">
                🔔
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#f0b90b] rounded-full"></span>
              </span>
            </div>
          </div>

          <div className="flex space-x-5 px-3 py-2 border-b border-[#2b313a] bg-[#181a20] text-gray-400 text-xs overflow-x-auto">
            <span className="text-[#f0b90b] font-bold border-b-2 border-[#f0b90b] pb-1 cursor-pointer">Price</span>
            <span onClick={() => setModalType('search')} className="hover:text-white cursor-pointer pb-1">Info</span>
            <span onClick={() => setActiveTab('trade')} className="hover:text-white cursor-pointer pb-1">Data</span>
            <span onClick={() => setActiveTab('futures')} className="hover:text-white cursor-pointer pb-1">Futures Square</span>
          </div>

          <div className="p-3 bg-[#181a20] space-y-2 border-b border-[#2b313a]">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-black text-[#0ecb81] tracking-tight">{selectedMarketCoin.price}</h1>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="text-gray-400 text-[11px]">${selectedMarketCoin.price}</span>
                  <span className={`text-[11px] font-bold ${selectedMarketCoin.change.startsWith('+') ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                    {selectedMarketCoin.change}
                  </span>
                </div>
              </div>
              <div className="text-right space-y-0.5 text-[10px] text-gray-400">
                <div className="flex justify-end space-x-2">
                  <span>24h High</span>
                  <span className="text-white font-mono">{selectedMarketCoin.high24h}</span>
                </div>
                <div className="flex justify-end space-x-2">
                  <span>24h Low</span>
                  <span className="text-white font-mono">{selectedMarketCoin.low24h}</span>
                </div>
                <div className="flex justify-end space-x-2">
                  <span>24h Vol(BTC)</span>
                  <span className="text-white font-mono">{selectedMarketCoin.volBTC}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center px-3 py-2 bg-[#181a20] border-b border-[#2b313a] text-gray-400">
            <div className="flex space-x-3 text-xs items-center font-medium">
              <span className="text-white">Time</span>
              {['15m', '1h', '4h', '1D'].map((tf) => (
                <span 
                  key={tf} 
                  onClick={() => setChartTimeframe(tf)}
                  className={`cursor-pointer px-1.5 py-0.5 rounded ${chartTimeframe === tf ? 'bg-[#2b313a] text-[#f0b90b] font-bold' : 'hover:text-white'}`}
                >
                  {tf}
                </span>
              ))}
            </div>
            <button onClick={() => setActiveTab('trade')} className="bg-[#f0b90b] text-black px-3 py-1 rounded text-xs font-bold cursor-pointer">
              Quick Trade
            </button>
          </div>

          <div className="px-3 py-1 bg-[#181a20] flex space-x-4 text-[10px] font-mono border-b border-[#2b313a]">
            <span className="text-[#f0b90b]">MA(7): {selectedMarketCoin.ma7}</span>
            <span className="text-[#9333ea]">MA(25): {selectedMarketCoin.ma25}</span>
            <span className="text-[#3b82f6]">MA(99): {selectedMarketCoin.ma99}</span>
          </div>

          <div className="bg-[#181a20] h-64 p-3 relative flex flex-col justify-between border-b border-[#2b313a]">
            <div className="absolute right-2 top-2 bottom-2 flex flex-col justify-between text-[9px] text-gray-500 font-mono text-right pointer-events-none">
              <span>78,754.59</span>
              <span>78,233.23</span>
              <span className="bg-[#2b313a] text-white px-1 py-0.5 rounded">{selectedMarketCoin.price}</span>
              <span>77,451.19</span>
            </div>

            <div className="flex-1 flex items-end justify-between px-2 space-x-3 relative z-10 pt-4">
              {selectedMarketCoin.candles.map((candle, idx) => {
                const isGreen = candle.green;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end relative">
                    <div className={`absolute w-[1px] ${isGreen ? 'bg-[#0ecb81]' : 'bg-[#f6465d]'}`} style={{ height: '85%', top: '5%' }}></div>
                    <div className={`w-full max-w-[22px] rounded-xs relative z-20 ${isGreen ? 'bg-[#0ecb81]' : 'bg-[#f6465d]'}`} style={{ height: `${Math.max(20, Math.min(75, (candle.close / 80000) * 100))}%` }}></div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-[#181a20] space-y-3">
            <div className="flex space-x-6 text-xs font-bold border-b border-[#2b313a] pb-2 text-gray-400">
              <span className="text-white border-b-2 border-[#f0b90b] pb-2">Order Book</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono font-bold">
                <span className="text-[#0ecb81]">{selectedMarketCoin.orderBookBuy}</span>
                <span className="text-[#f6465d]">{selectedMarketCoin.orderBookSell}</span>
              </div>
              <div className="w-full h-1.5 bg-[#f6465d] rounded-full overflow-hidden flex">
                <div className="bg-[#0ecb81] h-full" style={{ width: selectedMarketCoin.orderBookBuy }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. TRADE SPOT PAGE ================= */}
      {activeTab === 'trade' && (
        <div className="p-4 space-y-4 pb-24 animate-fadeIn">
          <div className="flex justify-between items-center border-b border-[#2b313a] pb-3">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>Spot Trading</span>
              <span className="text-[#f0b90b] text-xs">({selectedMarketCoin.symbol}/USDT)</span>
            </h2>
            <button onClick={() => setModalType('search')} className="text-xs bg-[#2b313a] px-3 py-1.5 rounded text-[#f0b90b] font-bold cursor-pointer">Change Coin</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3 bg-[#2b313a]/20 p-3.5 rounded-xl border border-[#2b313a]">
              <div className="flex space-x-2 bg-[#2b313a] p-1 rounded-lg text-[11px]">
                <button onClick={() => setOrderType('limit')} className={`flex-1 py-1 rounded font-bold cursor-pointer ${orderType === 'limit' ? 'bg-[#181a20] text-[#f0b90b]' : 'text-gray-400'}`}>Limit</button>
                <button onClick={() => setOrderType('market')} className={`flex-1 py-1 rounded font-bold cursor-pointer ${orderType === 'market' ? 'bg-[#181a20] text-[#f0b90b]' : 'text-gray-400'}`}>Market</button>
              </div>

              {orderType === 'limit' && (
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">Price (USDT)</label>
                  <input type="text" value={tradePrice} onChange={(e) => setTradePrice(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white font-mono text-xs outline-none focus:border-[#f0b90b]" />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400">Amount ({selectedMarketCoin.symbol})</label>
                <input type="number" placeholder="0.00" value={tradeAmount} onChange={(e) => setTradeAmount(e.target.value)} className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white font-mono text-xs outline-none focus:border-[#f0b90b]" />
              </div>

              <div className="pt-2 flex space-x-2">
                <button onClick={() => handleExecuteTrade('buy')} className="flex-1 bg-[#0ecb81] hover:bg-[#0eb072] text-black font-bold py-2.5 rounded text-xs cursor-pointer shadow">
                  Buy {selectedMarketCoin.symbol}
                </button>
                <button onClick={() => handleExecuteTrade('sell')} className="flex-1 bg-[#f6465d] hover:bg-[#e03e52] text-white font-bold py-2.5 rounded text-xs cursor-pointer shadow">
                  Sell {selectedMarketCoin.symbol}
                </button>
              </div>
            </div>

            <div className="space-y-2 bg-[#2b313a]/20 p-3.5 rounded-xl border border-[#2b313a] text-[11px]">
              <h4 className="font-bold text-gray-300 border-b border-[#2b313a] pb-1">Market Depth & Asks/Bids</h4>
              <div className="space-y-1 font-mono">
                <div className="flex justify-between text-[#f6465d]">
                  <span>{selectedMarketCoin.askPrice}</span>
                  <span>0.42 BTC</span>
                </div>
                <div className="flex justify-between text-[#f6465d]">
                  <span>{(parseFloat(selectedMarketCoin.askPrice) + 0.05).toFixed(2)}</span>
                  <span>1.20 BTC</span>
                </div>
                <div className="py-2 text-center text-sm font-bold text-[#0ecb81] bg-[#181a20] rounded my-1">
                  {selectedMarketCoin.price} USDT
                </div>
                <div className="flex justify-between text-[#0ecb81]">
                  <span>{selectedMarketCoin.bidPrice}</span>
                  <span>0.85 BTC</span>
                </div>
                <div className="flex justify-between text-[#0ecb81]">
                  <span>{(parseFloat(selectedMarketCoin.bidPrice) - 0.05).toFixed(2)}</span>
                  <span>2.10 BTC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. FUTURES PAGE ================= */}
      {activeTab === 'futures' && (
        <div className="p-4 space-y-4 pb-24 animate-fadeIn">
          <div className="flex justify-between items-center border-b border-[#2b313a] pb-3">
            <div className="flex items-center space-x-3">
              <h2 className="text-sm font-bold text-white">USDT-M Futures</h2>
              <span className="bg-[#f0b90b] text-black font-bold px-2 py-0.5 rounded text-[10px]">{leverage}x</span>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setFuturesMarginType(futuresMarginType === 'Cross' ? 'Isolated' : 'Cross')} 
                className="bg-[#2b313a] px-2.5 py-1 rounded text-xs text-[#f0b90b] font-bold cursor-pointer"
              >
                {futuresMarginType}
              </button>
            </div>
          </div>

          <div className="bg-[#2b313a]/20 p-4 rounded-xl border border-[#2b313a] space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">Contract Pair</span>
              <span className="text-white font-bold text-xs">{selectedMarketCoin.symbol}USDT Perpetual</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400">Adjust Leverage ({leverage}x)</label>
              <input 
                type="range" 
                min="1" 
                max="75" 
                value={leverage} 
                onChange={(e) => setLeverage(e.target.value)} 
                className="w-full accent-[#f0b90b] cursor-pointer" 
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>1x</span>
                <span>25x</span>
                <span>50x</span>
                <span>75x</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-gray-400">Margin Amount (USDT)</label>
              <input 
                type="number" 
                placeholder="0.00" 
                value={futuresAmount} 
                onChange={(e) => setFuturesAmount(e.target.value)} 
                className="w-full bg-[#181a20] border border-gray-700 p-2 rounded text-white font-mono text-xs outline-none focus:border-[#f0b90b]" 
              />
            </div>

            <div className="pt-2 flex space-x-2">
              <button onClick={() => handleExecuteFutures('long')} className="flex-1 bg-[#0ecb81] hover:bg-[#0eb072] text-black font-bold py-2.5 rounded text-xs cursor-pointer shadow">
                Open Long (Buy)
              </button>
              <button onClick={() => handleExecuteFutures('short')} className="flex-1 bg-[#f6465d] hover:bg-[#e03e52] text-white font-bold py-2.5 rounded text-xs cursor-pointer shadow">
                Open Short (Sell)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 5. WALLET / ASSETS PAGE ================= */}
      {activeTab === 'wallet' && (
        <div className="p-4 space-y-4 pb-24 animate-fadeIn">
          <div className="flex justify-between items-center border-b border-[#2b313a] pb-3">
            <h2 className="text-sm font-bold text-white">Assets Overview</h2>
            <span className="text-xs text-[#f0b90b] font-mono">Spot + Futures</span>
          </div>

          <div className="bg-gradient-to-r from-[#2b313a] to-[#181a20] p-4 rounded-xl border border-[#2b313a] space-y-3">
            <span className="text-gray-400 text-xs">Total Estimated Balance</span>
            <h1 className="text-2xl font-black text-white">
              $ { address ? (spotBalance + futuresBalance).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00' } USDT
            </h1>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button onClick={() => setModalType('depositSelect')} className="bg-[#f0b90b] text-black font-bold py-2 rounded-lg text-xs cursor-pointer">
                Deposit
              </button>
              <button onClick={() => setModalType('withdrawSelect')} className="bg-[#2b313a] text-white font-bold py-2 rounded-lg text-xs cursor-pointer border border-gray-700">
                Withdraw
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider">Account Balances</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-[#2b313a]/30 p-3 rounded-xl">
                <div>
                  <h4 className="font-bold text-white text-xs">Spot Account</h4>
                  <span className="text-[10px] text-gray-400">Tradable Spot Assets</span>
                </div>
                <div className="text-right font-mono font-bold text-white">
                  $ { address ? spotBalance.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00' }
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#2b313a]/30 p-3 rounded-xl">
                <div>
                  <h4 className="font-bold text-white text-xs">Futures Account</h4>
                  <span className="text-[10px] text-gray-400">Margin & Derivatives</span>
                </div>
                <div className="text-right font-mono font-bold text-white">
                  $ { address ? futuresBalance.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00' }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= BOTTOM NAVIGATION BAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#181a20] border-t border-[#2b313a] flex justify-around items-center py-2 z-40 text-[10px]">
        <div onClick={() => setActiveTab('home')} className={`flex flex-col items-center cursor-pointer ${activeTab === 'home' ? 'text-[#f0b90b]' : 'text-gray-400'}`}>
          <span className="text-base">🏠</span>
          <span>Home</span>
        </div>
        <div onClick={() => setActiveTab('markets')} className={`flex flex-col items-center cursor-pointer ${activeTab === 'markets' ? 'text-[#f0b90b]' : 'text-gray-400'}`}>
          <span className="text-base">📈</span>
          <span>Markets</span>
        </div>
        <div onClick={() => setActiveTab('trade')} className={`flex flex-col items-center cursor-pointer ${activeTab === 'trade' ? 'text-[#f0b90b]' : 'text-gray-400'}`}>
          <span className="text-base">💱</span>
          <span>Trade</span>
        </div>
        <div onClick={() => setActiveTab('futures')} className={`flex flex-col items-center cursor-pointer ${activeTab === 'futures' ? 'text-[#f0b90b]' : 'text-gray-400'}`}>
          <span className="text-base">�?/span>
          <span>Futures</span>
        </div>
        <div onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center cursor-pointer ${activeTab === 'wallet' ? 'text-[#f0b90b]' : 'text-gray-400'}`}>
          <span className="text-base">👛</span>
          <span>Assets</span>
        </div>
      </div>

      {/* ================= MODALS & POPUPS ================= */}
      {modalType && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#181a20] border border-[#2b313a] rounded-2xl w-full max-w-md p-5 space-y-4 relative max-h-[85vh] overflow-y-auto">
            <button onClick={() => setModalType(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-base font-bold cursor-pointer">�?/button>

            {/* 1. SEARCH MODAL */}
            {modalType === 'search' && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-white">Search Market / Coins</h3>
                <input 
                  type="text" 
                  placeholder="Search BTC, ETH, Solana..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full bg-[#2b313a]/50 border border-[#2b313a] p-2.5 rounded-xl text-white text-xs outline-none focus:border-[#f0b90b]" 
                />
                <div className="space-y-2">
                  {filteredCryptos.map((coin, i) => (
                    <div key={i} onClick={() => { setSelectedMarketCoin(coin); setModalType(null); setActiveTab('markets'); }} className="flex justify-between items-center bg-[#2b313a]/30 p-3 rounded-xl cursor-pointer hover:bg-[#2b313a]">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-xs">{coin.symbol}</span>
                        <span className="text-gray-400 text-[10px]">({coin.name})</span>
                      </div>
                      <span className="font-mono text-white text-xs font-bold">{coin.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. SUCCESS MODAL */}
            {modalType === 'success' && (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-[#0ecb81]/20 text-[#0ecb81] rounded-full flex items-center justify-center text-2xl mx-auto font-bold">�?/div>
                <h3 className="text-base font-bold text-white">ትራንዛክሽ�?በተሳካ ሁኔ�?ተከናውኗል!</h3>
                <p className="text-gray-400 text-xs">ትዕዛዝ�?በብሎክቼይ�?ኔትወር�?ተመዝግቧል�?/p>
                <button onClick={() => setModalType(null)} className="w-full bg-[#f0b90b] text-black font-bold py-2.5 rounded-xl cursor-pointer text-xs mt-2">
                  እሺ (OK)
                </button>
              </div>
            )}

            {/* 3. DEPOSIT SELECT MODAL */}
            {modalType === 'depositSelect' && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-white">Select Coin to Deposit</h3>
                <div className="space-y-2">
                  {cryptoList.map((coin, i) => (
                    <div key={i} onClick={() => { setSelectedWalletCoin(coin); setModalType('depositAddressModal'); }} className="flex justify-between items-center bg-[#2b313a]/30 p-3.5 rounded-xl cursor-pointer hover:bg-[#2b313a]">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-xs">{coin.symbol}</span>
                        <span className="text-gray-400 text-[10px]">{coin.network}</span>
                      </div>
                      <span className="text-[#f0b90b] text-xs font-bold">&gt;</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. DEPOSIT ADDRESS MODAL */}
            {modalType === 'depositAddressModal' && selectedWalletCoin && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-white">Deposit {selectedWalletCoin.symbol}</h3>
                <div className="bg-[#2b313a]/40 p-3 rounded-xl border border-[#2b313a] space-y-1">
                  <span className="text-[10px] text-[#f0b90b] font-bold">Network: {selectedWalletCoin.network}</span>
                  <p className="text-[10px] text-gray-400">Send only {selectedWalletCoin.symbol} to this address.</p>
                </div>
                <div className="bg-[#181a20] border border-gray-700 p-3 rounded-xl space-y-2">
                  <span className="text-[10px] text-gray-400 block">Deposit Address:</span>
                  <div className="font-mono text-[11px] text-white break-all">{selectedWalletCoin.depositAddress}</div>
                </div>
                <button onClick={() => handleCopyAddress(selectedWalletCoin.depositAddress)} className="w-full bg-[#f0b90b] text-black font-bold py-2.5 rounded-xl text-xs cursor-pointer">
                  {isCopied ? 'Copied to Clipboard! �? : 'Copy Address'}
                </button>
              </div>
            )}

            {/* 5. WITHDRAW SELECT MODAL */}
            {modalType === 'withdrawSelect' && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-white">Select Coin to Withdraw</h3>
                <div className="space-y-2">
                  {cryptoList.map((coin, i) => (
                    <div key={i} onClick={() => { setSelectedWalletCoin(coin); setModalType('withdrawFormModal'); }} className="flex justify-between items-center bg-[#2b313a]/30 p-3.5 rounded-xl cursor-pointer hover:bg-[#2b313a]">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-xs">{coin.symbol}</span>
                        <span className="text-gray-400 text-[10px]">{coin.network}</span>
                      </div>
                      <span className="text-[#f0b90b] text-xs font-bold">&gt;</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. WITHDRAW FORM MODAL */}
            {modalType === 'withdrawFormModal' && selectedWalletCoin && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-white">Withdraw {selectedWalletCoin.symbol}</h3>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">Destination Address</label>
                  <input type="text" placeholder="Paste address here..." value={withdrawAddress} onChange={(e) => setWithdrawAddress(e.target.value)} className="w-full bg-[#2b313a]/50 border border-gray-700 p-2 rounded text-white text-xs outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">Amount (Available: ${spotBalance.toFixed(2)})</label>
                  <input type="number" placeholder="0.00" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="w-full bg-[#2b313a]/50 border border-gray-700 p-2 rounded text-white text-xs outline-none" />
                </div>
                <button onClick={handleWithdrawSubmit} className="w-full bg-[#f0b90b] text-black font-bold py-2.5 rounded-xl text-xs cursor-pointer mt-2">
                  Confirm Withdrawal
                </button>
              </div>
            )}

            {/* 7. CONVERT MODAL */}
            {modalType === 'convertModal' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-white">Instant Crypto Convert</h3>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">You Pay ({convertFromCoin.symbol})</label>
                  <input type="number" placeholder="0.00" value={convertAmount} onChange={(e) => setConvertAmount(e.target.value)} className="w-full bg-[#2b313a]/50 border border-gray-700 p-2 rounded text-white text-xs outline-none" />
                </div>
                <div className="text-center text-gray-400 text-base">�?/div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">You Receive ({convertToCoin.symbol})</label>
                  <input type="text" disabled value={convertAmount ? (parseFloat(convertAmount) * 0.00013).toFixed(4) : '0.00'} className="w-full bg-[#2b313a]/30 border border-gray-700 p-2 rounded text-gray-400 text-xs outline-none font-mono" />
                </div>
                <button onClick={handleConvertSubmit} className="w-full bg-[#f0b90b] text-black font-bold py-2.5 rounded-xl text-xs cursor-pointer mt-2">
                  Convert Now
                </button>
              </div>
            )}

            {/* 8. EARN MODAL */}
            {modalType === 'earnModal' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-white">Crypto Earn & Staking</h3>
                <div className="space-y-2">
                  {earnProducts.map((p) => (
                    <div key={p.id} onClick={() => setSelectedEarnPlan(p)} className={`p-3 rounded-xl border cursor-pointer ${selectedEarnPlan?.id === p.id ? 'border-[#f0b90b] bg-[#f0b90b]/10' : 'border-[#2b313a] bg-[#2b313a]/30'}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white text-xs">{p.name}</span>
                        <span className="text-[#0ecb81] font-bold text-xs">APY {p.apy}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-1 pt-2">
                  <label className="text-[10px] text-gray-400">Stake Amount</label>
                  <input type="number" placeholder="0.00" value={earnStakeAmount} onChange={(e) => setEarnStakeAmount(e.target.value)} className="w-full bg-[#2b313a]/50 border border-gray-700 p-2 rounded text-white text-xs outline-none" />
                </div>
                <button onClick={handleEarnSubmit} className="w-full bg-[#0ecb81] text-black font-bold py-2.5 rounded-xl text-xs cursor-pointer">
                  Start Earning
                </button>
              </div>
            )}

            {/* 9. P2P MODAL */}
            {modalType === 'p2pModal' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-white">P2P Express Trade (ETB)</h3>
                  <div className="flex bg-[#2b313a] p-1 rounded text-[10px]">
                    <span onClick={() => setP2pType('buy')} className={`px-2 py-0.5 rounded cursor-pointer ${p2pType === 'buy' ? 'bg-[#0ecb81] text-black font-bold' : 'text-gray-400'}`}>Buy</span>
                    <span onClick={() => setP2pType('sell')} className={`px-2 py-0.5 rounded cursor-pointer ${p2pType === 'sell' ? 'bg-[#f6465d] text-white font-bold' : 'text-gray-400'}`}>Sell</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {p2pMerchants.map((m) => (
                    <div key={m.id} onClick={() => setP2pSelectedMerchant(m)} className={`p-3 rounded-xl border cursor-pointer ${p2pSelectedMerchant?.id === m.id ? 'border-[#f0b90b] bg-[#f0b90b]/10' : 'border-[#2b313a] bg-[#2b313a]/30'}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white text-xs">{m.name}</span>
                        <span className="text-[#0ecb81] font-bold text-xs">{m.price} ETB</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">Limit: {m.limit}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">Fiat Amount (ETB)</label>
                  <input type="number" placeholder="5000" value={p2pFiatAmount} onChange={(e) => setP2pFiatAmount(e.target.value)} className="w-full bg-[#2b313a]/50 border border-gray-700 p-2 rounded text-white text-xs outline-none" />
                </div>
                <button onClick={handleP2PSubmit} className="w-full bg-[#f0b90b] text-black font-bold py-2.5 rounded-xl text-xs cursor-pointer">
                  {p2pType === 'buy' ? 'Buy USDT' : 'Sell USDT'}
                </button>
              </div>
            )}

            {/* 10. TRANSFER MODAL */}
            {modalType === 'transferModal' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-white">Internal Crypto Transfer</h3>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">Recipient Email / UID / Phone</label>
                  <input type="text" placeholder="user@example.com or UID" value={transferRecipient} onChange={(e) => setTransferRecipient(e.target.value)} className="w-full bg-[#2b313a]/50 border border-gray-700 p-2 rounded text-white text-xs outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">Amount (USDT)</label>
                  <input type="number" placeholder="0.00" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} className="w-full bg-[#2b313a]/50 border border-gray-700 p-2 rounded text-white text-xs outline-none" />
                </div>
                <button onClick={handleTransferSubmit} className="w-full bg-[#f0b90b] text-black font-bold py-2.5 rounded-xl text-xs cursor-pointer">
                  Send Transfer
                </button>
              </div>
            )}

            {/* 11. PAY MODAL */}
            {modalType === 'payModal' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-white">Crypto Pay & Merchant QR</h3>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">Merchant ID / Pay Tag</label>
                  <input type="text" placeholder="@merchant_tag" value={payTarget} onChange={(e) => setPayTarget(e.target.value)} className="w-full bg-[#2b313a]/50 border border-gray-700 p-2 rounded text-white text-xs outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">Payment Amount (USDT)</label>
                  <input type="number" placeholder="0.00" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} className="w-full bg-[#2b313a]/50 border border-gray-700 p-2 rounded text-white text-xs outline-none" />
                </div>
                <button onClick={handlePaySubmit} className="w-full bg-[#ec4899] text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer">
                  Pay Now
                </button>
              </div>
            )}

            {/* 12. NOTIFICATIONS MODAL */}
            {modalType === 'notifications' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-white">System Notifications</h3>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="bg-[#2b313a]/30 p-3 rounded-xl border border-[#2b313a] space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="font-bold text-[#f0b90b]">{n.title}</span>
                        <span className="text-gray-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-300">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 13. SUPPORT & MORE MODALS */}
            {(modalType === 'support' || modalType === 'moreModal') && (
              <div className="space-y-3 text-center py-4">
                <div className="w-12 h-12 bg-[#f0b90b]/20 text-[#f0b90b] rounded-full flex items-center justify-center text-xl mx-auto font-bold">ℹ️</div>
                <h3 className="text-sm font-bold text-white">CryptoDEX Advanced Services</h3>
                <p className="text-gray-400 text-xs">ይህ አገልግሎት ሙሉ በሙ�?በቁጥጥ�?ስር ያለ እና በየጊዜ�?የሚዘመ�?ነው�?/p>
                <button onClick={() => setModalType(null)} className="w-full bg-[#2b313a] text-white font-bold py-2 rounded-xl text-xs cursor-pointer mt-2">
                  ዝጋ (Close)
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
