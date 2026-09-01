'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [account, setAccount] = useState('');
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const prov = new ethers.BrowserProvider(window.ethereum);
        const accs = await prov.send('eth_requestAccounts', []);
        setAccount(accs[0]);
        alert('Wallet Connected: ' + accs[0]);
      } catch (e) { console.error(e); }
    } else { alert('Please install MetaMask or Trust Wallet!'); }
  };
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
      alert('釆メ墸釆嫀 釅滇姯釆垐釆?釄樶尃釆?釈埖釋堘墶!');
      return;
    }
    setModalType('success');
  };

  // Handle Futures Execution
  const handleExecuteFutures = (positionType) => {
    if (!futuresAmount || parseFloat(futuresAmount) <= 0) {
      alert('釆メ墸釆嫀 釈ㄡ妳釈翅實 (Margin) 釄樶尃釆?釈埖釋堘墶!');
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
      alert('釆メ墸釆嫀 釈ㄡ垬釈滇埁釄?釆犪嫷釄埢 (Address) 釈埖釋堘墶!');
      return;
    }
    const val = parseFloat(withdrawAmount);
    if (!val || val <= 0) {
      alert('釆メ墸釆嫀 釅滇姯釆垐釆?釈ㄡ寛釆曖嫎釅?釄樶尃釆?釈埖釋堘墶!');
      return;
    }
    if (val > spotBalance) {
      alert('釅犪墏 釅€釄?釄掅埑釅?釈ㄡ垐釈庒壍釄?');
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
      alert('釆メ墸釆嫀 釅滇姯釆垐釆?釈ㄡ垬釅€釈ㄡ埅釈?釄樶尃釆?釈埖釋堘墶!');
      return;
    }
    setSpotBalance(prev => prev + 5); // Simulated balance adjustment
    setConvertAmount('');
    setModalType('success');
  };

  // Handle Earn Stake Submit
  const handleEarnSubmit = () => {
    const val = parseFloat(earnStakeAmount);
    if (!val || val <= 0) {
      alert('釆メ墸釆嫀 釄堘垱釄滇墍釄樶尌 釈ㄡ垰釐堘垗釋夅壍釆?釄樶尃釆?釈埖釋堘墶!');
      return;
    }
    setEarnStakeAmount('');
    setModalType('success');
  };

  // Handle P2P Submit
  const handleP2PSubmit = () => {
    const val = parseFloat(p2pFiatAmount);
    if (!val || val <= 0) {
      alert('釆メ墸釆嫀 釅滇姯釆垐釆?釈ㄡ寛釆曖嫎釅?釄樶尃釆?釈埖釋堘墶!');
      return;
    }
    setP2pFiatAmount('');
    setModalType('success');
  };

  // Handle Transfer Submit
  const handleTransferSubmit = () => {
    if (!transferRecipient || !transferAmount) {
      alert('釆メ墸釆嫀 釄佱垑釆曖垵 釄樶埁釋冡嫀釅?釈垯釄?');
      return;
    }
    setTransferRecipient('');
    setTransferAmount('');
    setModalType('success');
  };

  // Handle Pay Submit
  const handlePaySubmit = () => {
    if (!payTarget || !payAmount) {
      alert('釆メ墸釆嫀 釈ㄡ姯釐嶀嫬 釄樶埁釋冡媿釆?釅犪壍釆姯釄?釈埖釋堘墶!');
      return;
    }
    setPayTarget('');
    setPayAmount('');
    setModalType('success');
  };

  return (
    <div className="bg-[#181a20] text-gray-200 min-h-screen pb-28 selection:bg-[#f0b90b] selection:text-black font-sans relative text-xs">
      
      {/* ================= 1. HOME PAGE VIEW ================= */}
      {activeTab === 'home' && (
        <div className="p-4 space-y-5 animate-fadeIn pb-20">
          <div className="flex justify-between items-center py-2 border-b border-[#2b313a]">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#f0b90b] flex items-center justify-center text-black font-bold">B</div>
              <span className="font-bold text-lg text-white tracking-wide">CryptoDEX</span>
            </div>
            <div className="flex space-x-4 text-lg">
              <span onClick={() => setModalType('search')} className="cursor-pointer" title="Search">馃攳</span>
              <span onClick={() => setModalType('support')} className="cursor-pointer" title="Support">馃帶</span>
              <span onClick={() => setModalType('notifications')} className="cursor-pointer relative" title="Notifications">
                馃挰
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              </span>
            </div>
          </div>

          <div onClick={() => setModalType('search')} className="bg-[#2b313a]/50 border border-[#2b313a] rounded-xl px-4 py-3 flex items-center space-x-2 text-gray-400 cursor-pointer">
            <span>馃攳</span>
            <span className="text-xs">Search coin, stock, forex or market...</span>
          </div>

          {/* QUICK FEATURES GRID (Earn, Convert, P2P, Transfer, Pay, More) */}
          <div className="grid grid-cols-6 gap-2 bg-[#2b313a]/20 p-3 rounded-2xl border border-[#2b313a] text-center">
            <div onClick={() => setModalType('earnModal')} className="flex flex-col items-center cursor-pointer space-y-1 hover:opacity-80">
              <div className="w-10 h-10 rounded-xl bg-[#0ecb81]/20 text-[#0ecb81] flex items-center justify-center text-base font-bold">馃尡</div>
              <span className="text-[10px] font-bold text-gray-300">Earn</span>
            </div>
            <div onClick={() => setModalType('convertModal')} className="flex flex-col items-center cursor-pointer space-y-1 hover:opacity-80">
              <div className="w-10 h-10 rounded-xl bg-[#f0b90b]/20 text-[#f0b90b] flex items-center justify-center text-base font-bold">馃攧</div>
              <span className="text-[10px] font-bold text-gray-300">Convert</span>
            </div>
            <div onClick={() => setModalType('p2pModal')} className="flex flex-col items-center cursor-pointer space-y-1 hover:opacity-80">
              <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/20 text-[#3b82f6] flex items-center justify-center text-base font-bold">馃</div>
              <span className="text-[10px] font-bold text-gray-300">P2P</span>
            </div>
            <div onClick={() => setModalType('transferModal')} className="flex flex-col items-center cursor-pointer space-y-1 hover:opacity-80">
              <div className="w-10 h-10 rounded-xl bg-[#9333ea]/20 text-[#9333ea] flex items-center justify-center text-base font-bold">馃捀</div>
              <span className="text-[10px] font-bold text-gray-300">Transfer</span>
            </div>
            <div onClick={() => setModalType('payModal')} className="flex flex-col items-center cursor-pointer space-y-1 hover:opacity-80">
              <div className="w-10 h-10 rounded-xl bg-[#ec4899]/20 text-[#ec4899] flex items-center justify-center text-base font-bold">馃挸</div>
              <span className="text-[10px] font-bold text-gray-300">Pay</span>
            </div>
            <div onClick={() => setModalType('moreModal')} className="flex flex-col items-center cursor-pointer space-y-1 hover:opacity-80">
              <div className="w-10 h-10 rounded-xl bg-gray-700/40 text-white flex items-center justify-center text-base font-bold">馃帥锔?/div>
              <span className="text-[10px] font-bold text-gray-300">More</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#2b313a]/80 to-[#181a20] border border-[#2b313a] p-4 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Est. Total Value (USDT)</p>
              <h2 className="text-2xl font-black text-white mt-1">
                {(spotBalance + futuresBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })} 
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
                <span>鈿?/span>
                <span>Global Crypto & Stock Fundamental News</span>
              </h3>
              <span className="text-[10px] bg-[#0ecb81]/20 text-[#0ecb81] px-2 py-0.5 rounded font-mono font-bold">鈼?LIVE FEED</span>
            </div>

            <div className="space-y-2">
              {newsList.map((news) => (
                <div key={news.id} className="bg-[#2b313a]/30 border border-[#2b313a] p-3.5 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="bg-[#f0b90b]/10 text-[#f0b90b] px-2 py-0.5 rounded font-bold">{news.category}</span>
                    <span className="text-gray-400">{news.source} 鈥?{news.time}</span>
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
                鈫?              </span>
              <span className="font-bold text-white text-sm tracking-wide">{selectedMarketCoin.symbol}/USDT</span>
              <span onClick={() => setModalType('search')} className="text-[10px] bg-[#2b313a] text-gray-300 px-1.5 py-0.5 rounded cursor-pointer">鈻?Change</span>
            </div>
            <div className="flex items-center space-x-4 text-base">
              <span onClick={() => setModalType('search')} className="cursor-pointer">猸?/span>
              <span onClick={() => setModalType('notifications')} className="cursor-pointer relative">
                馃敂
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
            {/* Left: Spot Order Form */}
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

            {/* Right: Order Book Data */}
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
                placeholder="Enter margin amount..." 
                value={futuresAmount}
                onChange={(e) => setFuturesAmount(e.target.value)}
                className="w-full bg-[#181a20] border border-gray-700 p-2.5 rounded text-white font-mono text-xs outline-none focus:border-[#f0b90b]" 
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button onClick={() => handleExecuteFutures('long')} className="bg-[#0ecb81] hover:bg-[#0eb072] text-black font-bold py-3 rounded text-xs cursor-pointer shadow">
                Open Long (Buy) 馃搱
              </button>
              <button onClick={() => handleExecuteFutures('short')} className="bg-[#f6465d] hover:bg-[#e03e52] text-white font-bold py-3 rounded text-xs cursor-pointer shadow">
                Open Short (Sell) 馃搲
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 5. ASSETS / WALLET PAGE ================= */}
      {activeTab === 'assets' && (
        <div className="p-4 space-y-5 pb-24 animate-fadeIn">
          <div className="border-b border-[#2b313a] pb-3">
            <h2 className="text-base font-bold text-white">Assets Overview</h2>
            <p className="text-xs text-gray-400">Manage your spot, futures, and funding wallets securely</p>
          </div>

          <div className="bg-gradient-to-r from-[#2b313a]/90 to-[#181a20] border border-[#2b313a] p-4 rounded-2xl space-y-2">
            <span className="text-xs text-gray-400">Total Portfolio Balance</span>
            <h1 className="text-2xl font-black text-white font-mono">
              {(spotBalance + futuresBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-xs text-gray-400 font-normal">USDT</span>
            </h1>
            <div className="flex space-x-3 pt-3">
              <button 
                onClick={() => { setDepositStep('select'); setSearchQuery(''); setModalType('depositModal'); }} 
                className="flex-1 bg-[#f0b90b] text-black font-bold py-2 rounded text-xs cursor-pointer shadow"
              >
                Deposit
              </button>
              <button 
                onClick={() => { setWithdrawStep('select'); setSearchQuery(''); setModalType('withdrawModal'); }} 
                className="flex-1 bg-[#2b313a] text-white font-bold py-2 rounded text-xs border border-gray-600 cursor-pointer hover:bg-[#2b313a]/80"
              >
                Withdraw
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-xs text-gray-300">Wallet Breakdown</h3>
            <div className="bg-[#2b313a]/30 p-3.5 rounded-xl flex justify-between items-center">
              <div>
                <h4 className="text-white font-bold text-xs">Spot Wallet</h4>
                <p className="text-[10px] text-gray-400">Available for instant spot trading</p>
              </div>
              <span className="font-mono font-bold text-[#0ecb81]">{spotBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT</span>
            </div>
            <div className="bg-[#2b313a]/30 p-3.5 rounded-xl flex justify-between items-center">
              <div>
                <h4 className="text-white font-bold text-xs">Futures Wallet</h4>
                <p className="text-[10px] text-gray-400">Margin allocated for derivatives</p>
              </div>
              <span className="font-mono font-bold text-[#f0b90b]">{futuresBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= FIXED BOTTOM NAVIGATION BAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#181a20] border-t border-[#2b313a] flex justify-around py-3 text-[11px] z-40">
        <div onClick={() => setActiveTab('home')} className={`flex flex-col items-center cursor-pointer transition ${activeTab === 'home' ? 'text-[#f0b90b] font-bold' : 'text-gray-400 hover:text-white'}`}>
          <span className="text-lg">馃彔</span>
          <span className="mt-0.5">Home</span>
        </div>
        <div onClick={() => setActiveTab('markets')} className={`flex flex-col items-center cursor-pointer transition ${activeTab === 'markets' ? 'text-[#f0b90b] font-bold' : 'text-gray-400 hover:text-white'}`}>
          <span className="text-lg">馃搱</span>
          <span className="mt-0.5">Markets</span>
        </div>
        <div onClick={() => setActiveTab('trade')} className={`flex flex-col items-center cursor-pointer transition ${activeTab === 'trade' ? 'text-[#f0b90b] font-bold' : 'text-gray-400 hover:text-white'}`}>
          <span className="text-lg">鈬?/span>
          <span className="mt-0.5">Trade</span>
        </div>
        <div onClick={() => setActiveTab('futures')} className={`flex flex-col items-center cursor-pointer transition ${activeTab === 'futures' ? 'text-[#f0b90b] font-bold' : 'text-gray-400 hover:text-white'}`}>
          <span className="text-lg">馃搳</span>
          <span className="mt-0.5">Futures</span>
        </div>
        <div onClick={() => setActiveTab('assets')} className={`flex flex-col items-center cursor-pointer transition ${activeTab === 'assets' ? 'text-[#f0b90b] font-bold' : 'text-gray-400 hover:text-white'}`}>
          <span className="text-lg">馃捈</span>
          <span className="mt-0.5">Assets</span>
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* SEARCH MODAL */}
      {modalType === 'search' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#181a20] border border-[#2b313a] w-full max-w-md rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-[#f0b90b]">Select Market Pair</h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white font-bold cursor-pointer">鉁?/button>
            </div>
            <input 
              type="text" 
              placeholder="Search BTC, ETH..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2b313a] border border-gray-700 p-2.5 rounded text-xs text-white outline-none focus:border-[#f0b90b]"
              autoFocus
            />
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredCryptos.map((coin, idx) => (
                <div 
                  key={idx} 
                  onClick={() => { setSelectedMarketCoin(coin); setActiveTab('markets'); setModalType(null); }}
                  className="flex justify-between items-center p-2.5 rounded bg-[#2b313a]/50 hover:bg-[#2b313a] cursor-pointer text-xs"
                >
                  <span className="font-bold text-white">{coin.name} ({coin.symbol}/USDT)</span>
                  <span className="font-mono text-[#f0b90b]">{coin.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 1. CONVERT MODAL (SWAP) ================= */}
      {modalType === 'convertModal' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#181a20] border border-[#2b313a] w-full max-w-md rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#2b313a] pb-3">
              <h3 className="font-bold text-sm text-[#f0b90b]">Crypto Convert & Swap</h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white font-bold cursor-pointer">鉁?/button>
            </div>

            <div className="space-y-3">
              {/* From Coin Selection */}
              <div className="bg-[#2b313a]/40 p-3 rounded-xl border border-[#2b313a] space-y-1">
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>From (You Pay)</span>
                  <span>Balance: {spotBalance.toFixed(2)} USDT</span>
                </div>
                <div className="flex justify-between items-center">
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    value={convertAmount}
                    onChange={(e) => setConvertAmount(e.target.value)}
                    className="w-2/3 bg-transparent text-white font-mono text-base outline-none"
                  />
                  <div className="bg-[#2b313a] px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center space-x-1">
                    <span>{convertFromCoin.symbol}</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <span className="bg-[#2b313a] p-2 rounded-full inline-block text-xs text-[#f0b90b]">鈫?/span>
              </div>

              {/* To Coin Selection */}
              <div className="bg-[#2b313a]/40 p-3 rounded-xl border border-[#2b313a] space-y-1">
                <span className="text-[10px] text-gray-400">To (You Receive Estimated)</span>
                <div className="flex justify-between items-center">
                  <span className="text-white font-mono text-base">
                    {convertAmount ? (parseFloat(convertAmount) / (convertToCoin.price || 1)).toFixed(6) : '0.00'}
                  </span>
                  <select 
                    onChange={(e) => {
                      const found = cryptoList.find(c => c.symbol === e.target.value);
                      if (found) setConvertToCoin(found);
                    }}
                    className="bg-[#2b313a] text-white text-xs font-bold p-2 rounded-lg outline-none cursor-pointer"
                  >
                    {cryptoList.map(c => (
                      <option key={c.symbol} value={c.symbol}>{c.symbol}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                onClick={handleConvertSubmit} 
                className="w-full bg-[#f0b90b] hover:bg-[#d9a70a] text-black font-bold py-3 rounded-xl text-xs cursor-pointer shadow mt-2"
              >
                Convert Now (Instant Swap)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. EARN MODAL ================= */}
      {modalType === 'earnModal' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#181a20] border border-[#2b313a] w-full max-w-md rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#2b313a] pb-3">
              <h3 className="font-bold text-sm text-[#0ecb81]">Crypto Earn & Staking</h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white font-bold cursor-pointer">鉁?/button>
            </div>

            {!selectedEarnPlan ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <p className="text-[11px] text-gray-400 mb-2">Select a high-yield staking plan to grow your assets:</p>
                {earnProducts.map((p) => (
                  <div 
                    key={p.id} 
                    onClick={() => setSelectedEarnPlan(p)}
                    className="flex justify-between items-center bg-[#2b313a]/40 hover:bg-[#2b313a] p-3 rounded-xl cursor-pointer"
                  >
                    <div>
                      <h4 className="font-bold text-white text-xs">{p.name}</h4>
                      <span className="text-[10px] text-gray-400">{p.type} 鈥?Risk: {p.risk}</span>
                    </div>
                    <span className="font-mono font-bold text-[#0ecb81] text-sm">+{p.apy} APY</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <button onClick={() => setSelectedEarnPlan(null)} className="text-xs text-[#0ecb81] hover:underline cursor-pointer">&larr; Back to earn list</button>
                <div className="bg-[#2b313a]/30 p-3 rounded-xl">
                  <h4 className="font-bold text-white text-xs">{selectedEarnPlan.name}</h4>
                  <p className="text-[10px] text-[#0ecb81]">Estimated APY: {selectedEarnPlan.apy}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">Stake Amount ({selectedEarnPlan.coin})</label>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    value={earnStakeAmount}
                    onChange={(e) => setEarnStakeAmount(e.target.value)}
                    className="w-full bg-[#2b313a] border border-gray-700 p-2.5 rounded text-xs text-white font-mono outline-none focus:border-[#0ecb81]"
                  />
                </div>
                <button onClick={handleEarnSubmit} className="w-full bg-[#0ecb81] hover:bg-[#0eb072] text-black font-bold py-3 rounded-xl text-xs cursor-pointer">
                  Confirm Staking
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= 3. P2P MODAL ================= */}
      {modalType === 'p2pModal' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#181a20] border border-[#2b313a] w-full max-w-md rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#2b313a] pb-3">
              <div className="flex space-x-3">
                <button onClick={() => setP2pType('buy')} className={`font-bold text-sm ${p2pType === 'buy' ? 'text-[#0ecb81] border-b-2 border-[#0ecb81]' : 'text-gray-400'}`}>Buy USDT</button>
                <button onClick={() => setP2pType('sell')} className={`font-bold text-sm ${p2pType === 'sell' ? 'text-[#f6465d] border-b-2 border-[#f6465d]' : 'text-gray-400'}`}>Sell USDT</button>
              </div>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white font-bold cursor-pointer">鉁?/button>
            </div>

            {!p2pSelectedMerchant ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {p2pMerchants.map((m) => (
                  <div key={m.id} className="bg-[#2b313a]/40 p-3 rounded-xl space-y-2 border border-[#2b313a]">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-xs">{m.name}</span>
                      <span className="font-mono text-[#0ecb81] font-bold">{m.price} ETB</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>Orders: {m.orders} ({m.completion})</span>
                      <span>{m.limit}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <div className="flex space-x-1">
                        {m.methods.map((met, i) => (
                          <span key={i} className="bg-[#2b313a] px-2 py-0.5 rounded text-[9px] text-[#f0b90b]">{met}</span>
                        ))}
                      </div>
                      <button onClick={() => setP2pSelectedMerchant(m)} className="bg-[#f0b90b] text-black px-3 py-1 rounded text-xs font-bold cursor-pointer">
                        {p2pType === 'buy' ? 'Buy USDT' : 'Sell USDT'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <button onClick={() => setP2pSelectedMerchant(null)} className="text-xs text-[#f0b90b] hover:underline cursor-pointer">&larr; Back to merchants</button>
                <div className="bg-[#2b313a]/30 p-3 rounded-xl">
                  <h4 className="font-bold text-white text-xs">Trading with {p2pSelectedMerchant.name}</h4>
                  <p className="text-[10px] text-gray-400">Unit Price: {p2pSelectedMerchant.price} ETB/USDT</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">Enter Fiat Amount (ETB)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 10000" 
                    value={p2pFiatAmount}
                    onChange={(e) => setP2pFiatAmount(e.target.value)}
                    className="w-full bg-[#2b313a] border border-gray-700 p-2.5 rounded text-xs text-white font-mono outline-none focus:border-[#f0b90b]"
                  />
                </div>
                <button onClick={handleP2PSubmit} className="w-full bg-[#0ecb81] text-black font-bold py-3 rounded-xl text-xs cursor-pointer">
                  Place P2P Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= 4. TRANSFER MODAL ================= */}
      {modalType === 'transferModal' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#181a20] border border-[#2b313a] w-full max-w-md rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#2b313a] pb-3">
              <h3 className="font-bold text-sm text-[#9333ea]">Internal & Wallet Transfer</h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white font-bold cursor-pointer">鉁?/button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400">Recipient Email / UID / Phone</label>
                <input 
                  type="text" 
                  placeholder="Enter email or UID..." 
                  value={transferRecipient}
                  onChange={(e) => setTransferRecipient(e.target.value)}
                  className="w-full bg-[#2b313a] border border-gray-700 p-2.5 rounded text-xs text-white outline-none focus:border-[#9333ea]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400">Transfer Amount (USDT)</label>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full bg-[#2b313a] border border-gray-700 p-2.5 rounded text-xs text-white font-mono outline-none focus:border-[#9333ea]"
                />
              </div>

              <button onClick={handleTransferSubmit} className="w-full bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold py-3 rounded-xl text-xs cursor-pointer shadow">
                Send Transfer Instantly (Fee 0)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 5. PAY MODAL ================= */}
      {modalType === 'payModal' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#181a20] border border-[#2b313a] w-full max-w-md rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#2b313a] pb-3">
              <h3 className="font-bold text-sm text-[#ec4899]">Crypto Pay & Merchant Checkout</h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white font-bold cursor-pointer">鉁?/button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400">Merchant ID or Pay ID</label>
                <input 
                  type="text" 
                  placeholder="Scan QR or enter Pay ID..." 
                  value={payTarget}
                  onChange={(e) => setPayTarget(e.target.value)}
                  className="w-full bg-[#2b313a] border border-gray-700 p-2.5 rounded text-xs text-white outline-none focus:border-[#ec4899]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400">Payment Amount (USDT)</label>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full bg-[#2b313a] border border-gray-700 p-2.5 rounded text-xs text-white font-mono outline-none focus:border-[#ec4899]"
                />
              </div>

              <button onClick={handlePaySubmit} className="w-full bg-[#ec4899] hover:bg-[#db2777] text-white font-bold py-3 rounded-xl text-xs cursor-pointer shadow">
                Pay Merchant Securely
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 6. MORE MODAL ================= */}
      {modalType === 'moreModal' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#181a20] border border-[#2b313a] w-full max-w-md rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#2b313a] pb-3">
              <h3 className="font-bold text-sm text-[#f0b90b]">All Platform Services & Mini Apps</h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white font-bold cursor-pointer">鉁?/button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div onClick={() => setModalType(null)} className="bg-[#2b313a]/40 p-3 rounded-xl cursor-pointer hover:bg-[#2b313a]">
                <span className="text-xl block mb-1">馃殌</span>
                <span className="font-bold text-white">Launchpad</span>
              </div>
              <div onClick={() => setModalType(null)} className="bg-[#2b313a]/40 p-3 rounded-xl cursor-pointer hover:bg-[#2b313a]">
                <span className="text-xl block mb-1">馃柤锔?/span>
                <span className="font-bold text-white">NFT Marketplace</span>
              </div>
              <div onClick={() => setModalType(null)} className="bg-[#2b313a]/40 p-3 rounded-xl cursor-pointer hover:bg-[#2b313a]">
                <span className="text-xl block mb-1">馃巵</span>
                <span className="font-bold text-white">Gift Card</span>
              </div>
              <div onClick={() => setModalType(null)} className="bg-[#2b313a]/40 p-3 rounded-xl cursor-pointer hover:bg-[#2b313a]">
                <span className="text-xl block mb-1">馃</span>
                <span className="font-bold text-white">Trading Bots</span>
              </div>
              <div onClick={() => setModalType(null)} className="bg-[#2b313a]/40 p-3 rounded-xl cursor-pointer hover:bg-[#2b313a]">
                <span className="text-xl block mb-1">馃摐</span>
                <span className="font-bold text-white">Square Feed</span>
              </div>
              <div onClick={() => setModalType(null)} className="bg-[#2b313a]/40 p-3 rounded-xl cursor-pointer hover:bg-[#2b313a]">
                <span className="text-xl block mb-1">馃洝锔?/span>
                <span className="font-bold text-white">VIP Loans</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADVANCED DEPOSIT MODAL WITH FULL ADDRESS DISPLAY FOR ALL CRYPTOS */}
      {modalType === 'depositModal' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#181a20] border border-[#2b313a] w-full max-w-md rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#2b313a] pb-3">
              <h3 className="font-bold text-sm text-[#f0b90b]">
                {depositStep === 'select' ? 'Select Crypto to Deposit' : `Deposit ${selectedWalletCoin?.symbol}`}
              </h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white font-bold cursor-pointer">鉁?/button>
            </div>

            {depositStep === 'select' ? (
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Search coin (e.g. BTC, ETH, USDT)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#2b313a] border border-gray-700 p-2.5 rounded text-xs text-white outline-none focus:border-[#f0b90b]"
                  autoFocus
                />
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredCryptos.map((coin, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => { setSelectedWalletCoin(coin); setDepositStep('address'); }}
                      className="flex justify-between items-center p-3 rounded-xl bg-[#2b313a]/40 hover:bg-[#2b313a] cursor-pointer transition"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#f0b90b]/20 text-[#f0b90b] flex items-center font-bold justify-center text-xs">{coin.symbol[0]}</div>
                        <div>
                          <h4 className="font-bold text-white text-xs">{coin.name}</h4>
                          <span className="text-[10px] text-gray-400">{coin.network}</span>
                        </div>
                      </div>
                      <span className="text-[#f0b90b] text-xs font-bold">&gt;</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <button onClick={() => setDepositStep('select')} className="text-xs text-[#f0b90b] hover:underline cursor-pointer">&larr; Back to coin list</button>
                
                <div className="bg-[#2b313a]/40 p-3.5 rounded-xl space-y-2 border border-[#2b313a]">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Network:</span>
                    <span className="text-white font-bold">{selectedWalletCoin?.network}</span>
                  </div>
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-gray-400">Deposit Address:</span>
                    <div className="bg-[#181a20] p-3 rounded border border-gray-700 font-mono text-[11px] text-[#0ecb81] break-all select-all leading-relaxed">
                      {selectedWalletCoin?.depositAddress}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleCopyAddress(selectedWalletCoin?.depositAddress)} 
                  className={`w-full font-bold py-3 rounded text-xs cursor-pointer transition shadow ${
                    isCopied ? 'bg-[#0ecb81] text-black' : 'bg-[#f0b90b] text-black hover:bg-[#d9a70a]'
                  }`}
                >
                  {isCopied ? '鉁?Copied Successfully!' : 'Copy Address'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADVANCED WITHDRAW MODAL WITH SEARCH & FULL FORM */}
      {modalType === 'withdrawModal' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#181a20] border border-[#2b313a] w-full max-w-md rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#2b313a] pb-3">
              <h3 className="font-bold text-sm text-[#f0b90b]">
                {withdrawStep === 'select' ? 'Select Crypto to Withdraw' : `Withdraw ${selectedWalletCoin?.symbol}`}
              </h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white font-bold cursor-pointer">鉁?/button>
            </div>

            {withdrawStep === 'select' ? (
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Search coin (e.g. BTC, ETH, USDT)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#2b313a] border border-gray-700 p-2.5 rounded text-xs text-white outline-none focus:border-[#f0b90b]"
                  autoFocus
                />
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredCryptos.map((coin, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => { setSelectedWalletCoin(coin); setWithdrawStep('form'); }}
                      className="flex justify-between items-center p-3 rounded-xl bg-[#2b313a]/40 hover:bg-[#2b313a] cursor-pointer transition"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#f0b90b]/20 text-[#f0b90b] flex items-center font-bold justify-center text-xs">{coin.symbol[0]}</div>
                        <div>
                          <h4 className="font-bold text-white text-xs">{coin.name}</h4>
                          <span className="text-[10px] text-gray-400">Available: {spotBalance.toFixed(2)} USDT</span>
                        </div>
                      </div>
                      <span className="text-[#f0b90b] text-xs font-bold">&gt;</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button onClick={() => setWithdrawStep('select')} className="text-xs text-[#f0b90b] hover:underline cursor-pointer">&larr; Back to coin list</button>
                
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">Destination Address ({selectedWalletCoin?.symbol})</label>
                  <input 
                    type="text" 
                    placeholder="Paste recipient address..." 
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    className="w-full bg-[#2b313a] border border-gray-700 p-2.5 rounded text-xs text-white outline-none focus:border-[#f0b90b]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>Withdraw Amount</span>
                    <span>Avail: {spotBalance.toFixed(2)} USDT</span>
                  </div>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-[#2b313a] border border-gray-700 p-2.5 rounded text-xs text-white font-mono outline-none focus:border-[#f0b90b]"
                  />
                </div>

                <button 
                  onClick={handleWithdrawSubmit} 
                  className="w-full bg-[#f0b90b] hover:bg-[#d9a70a] text-black font-bold py-3 rounded text-xs cursor-pointer shadow mt-2"
                >
                  Confirm Withdraw
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* NOTIFICATIONS MODAL */}
      {modalType === 'notifications' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#181a20] border border-[#2b313a] w-full max-w-md rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-[#f0b90b]">Trading Notifications</h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white font-bold cursor-pointer">鉁?/button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="bg-[#2b313a]/40 p-2.5 rounded space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-white">{n.title}</span>
                    <span className="text-gray-500">{n.time}</span>
                  </div>
                  <p className="text-[10px] text-gray-300">{n.desc}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setModalType(null)} className="w-full bg-[#f0b90b] text-black font-bold py-2 rounded text-xs cursor-pointer">Close</button>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {modalType === 'success' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#181a20] border border-[#2b313a] w-full max-w-xs rounded-2xl p-5 text-center space-y-3">
            <div className="w-10 h-10 bg-[#0ecb81]/20 text-[#0ecb81] rounded-full flex items-center justify-center mx-auto text-xl font-bold">鉁?/div>
            <h3 className="font-bold text-sm text-white">Action Executed Successfully!</h3>
            <button onClick={() => setModalType(null)} className="w-full bg-[#f0b90b] text-black font-bold py-2 rounded text-xs cursor-pointer">OK</button>
          </div>
        </div>
      )}

    </div>
  );
}
