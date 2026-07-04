import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';

// Comprehensive dataset with multi-timeline history and transaction volume tracking
const REALISTIC_STOCKS = {
  AAPL: { 
    name: "Apple Inc.", sector: "Technology", current: 176.31, open: 174.20, high: 177.50, low: 173.80, volume: "52.4M",
    history: [
      { time: '09:30', Price: 174.2, Volume: 4200 },
      { time: '10:30', Price: 175.1, Volume: 5100 },
      { time: '11:30', Price: 174.8, Volume: 3900 },
      { time: '12:30', Price: 176.0, Volume: 6200 },
      { time: '13:30', Price: 175.5, Volume: 4800 },
      { time: '14:30', Price: 176.31, Volume: 7100 }
    ]
  },
  TSLA: { 
    name: "Tesla Inc.", sector: "Automotive", current: 180.20, open: 182.50, high: 184.00, low: 178.10, volume: "84.1M",
    history: [
      { time: '09:30', Price: 182.5, Volume: 8500 },
      { time: '10:30', Price: 181.2, Volume: 7200 },
      { time: '11:30', Price: 179.0, Volume: 9100 },
      { time: '12:30', Price: 180.8, Volume: 6400 },
      { time: '13:30', Price: 178.9, Volume: 5900 },
      { time: '14:30', Price: 180.20, Volume: 8100 }
    ]
  },
  NVDA: { 
    name: "NVIDIA Corp.", sector: "Semiconductors", current: 875.00, open: 855.00, high: 882.00, low: 851.00, volume: "41.7M",
    history: [
      { time: '09:30', Price: 855.0, Volume: 9200 },
      { time: '10:30', Price: 864.2, Volume: 11000 },
      { time: '11:30', Price: 859.1, Volume: 8400 },
      { time: '12:30', Price: 868.5, Volume: 10500 },
      { time: '13:30', Price: 871.0, Volume: 9900 },
      { time: '14:30', Price: 875.00, Volume: 13000 }
    ]
  },
  RELIANCE: { 
    name: "Reliance Industries", sector: "Energy/Telecom", current: 2450.75, open: 2432.00, high: 2465.00, low: 2428.00, volume: "12.8M",
    history: [
      { time: '09:30', Price: 2432.0, Volume: 2100 },
      { time: '10:30', Price: 2441.5, Volume: 3400 },
      { time: '11:30', Price: 2438.0, Volume: 1900 },
      { time: '12:30', Price: 2455.2, Volume: 4200 },
      { time: '13:30', Price: 2447.0, Volume: 2800 },
      { time: '14:30', Price: 2450.75, Volume: 3900 }
    ]
  }
};

const MARKET_INDICES = [
  { name: "NIFTY 50", value: "22,493.50", change: "+0.85%", up: true },
  { name: "SENSEX", value: "74,014.55", change: "+0.72%", up: true },
  { name: "NASDAQ", value: "16,274.94", change: "-0.23%", up: false }
];

const MARKET_NEWS = [
  { id: 1, source: "Bloomberg", time: "10m ago", headline: "Semiconductor supply constraints ease as global foundry output stabilizes." },
  { id: 2, source: "Reuters", time: "45m ago", headline: "Federal Reserve hints at steady interest rates citing resilient retail metrics." },
  { id: 3, source: "Economic Times", time: "2h ago", headline: "Tech indices hit record highs amid automated institutional trade inflows." }
];

export default function App() {
  const [stocks, setStocks] = useState(REALISTIC_STOCKS);
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [watchlist, setWatchlist] = useState(['AAPL', 'TSLA', 'NVDA']);
  const [timeframe, setTimeframe] = useState('1D');

  // Real-time server streaming emulator tracking pricing changes and volume updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => {
        const updated = { ...prevStocks };
        Object.keys(updated).forEach(ticker => {
          const change = (Math.random() - 0.48) * (updated[ticker].current * 0.005);
          const newPrice = parseFloat((updated[ticker].current + change).toFixed(2));
          
          const historyArr = [...updated[ticker].history];
          const lastIndex = historyArr.length - 1;
          
          // Dynamically push variance directly onto the trending dataset nodes
          historyArr[lastIndex] = {
            ...historyArr[lastIndex],
            Price: newPrice,
            Volume: Math.floor(historyArr[lastIndex].Volume + (Math.random() * 100))
          };

          updated[ticker] = {
            ...updated[ticker],
            current: newPrice,
            high: newPrice > updated[ticker].high ? newPrice : updated[ticker].high,
            low: newPrice < updated[ticker].low ? newPrice : updated[ticker].low,
            history: historyArr
          };
        });
        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const activeStock = stocks[selectedStock];
  const priceChange = parseFloat((activeStock.current - activeStock.open).toFixed(2));
  const percentChange = ((priceChange / activeStock.open) * 100).toFixed(2);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#09090b', color: '#f4f4f5', padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* TOP LEVEL GLOBAL APP HEADER */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #27272a', paddingBottom: '16px', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📊 AlphaVantage Terminal <span style={{ fontSize: '10px', backgroundColor: '#1e293b', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', border: '1px solid #334155' }}>PRO V2.4</span>
            </h1>
            <p style={{ margin: '4px 0 0 0', color: '#a1a1aa', fontSize: '13px' }}>Institutional metric streaming node with high-density data visualizations.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }}></span>
            <span style={{ fontSize: '12px', color: '#71717a', fontWeight: '500' }}>DATASTREAM FEED: CONNECTED</span>
          </div>
        </header>

        {/* COMPONENT 1: GLOBAL MARKET TICKER RIBBON */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {MARKET_INDICES.map(idx => (
            <div key={idx.name} style={{ backgroundColor: '#18181b', padding: '16px', borderRadius: '8px', border: '1px solid #27272a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#71717a', fontWeight: '600' }}>{idx.name}</div>
                <div style={{ fontSize: '18px', fontWeight: '700', marginTop: '4px' }}>{idx.value}</div>
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', padding: '4px 8px', borderRadius: '4px', backgroundColor: idx.up ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: idx.up ? '#22c55e' : '#ef4444' }}>
                {idx.change}
              </span>
            </div>
          ))}
        </section>

        {/* CORE WORKSPACE GRID CONTAINER */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>
          
          {/* LEFT COLUMN: PRIMARY TRADING CHARTS & TECHNICAL DETAILS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* MAIN CHART WINDOW COMPONENT */}
            <main style={{ backgroundColor: '#18181b', borderRadius: '12px', border: '1px solid #27272a', padding: '24px' }}>
              
              {/* Asset Header Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>{activeStock.name}</h2>
                    <span style={{ fontSize: '12px', backgroundColor: '#27272a', color: '#a1a1aa', padding: '2px 6px', borderRadius: '4px' }}>{selectedStock}</span>
                  </div>
                  <p style={{ margin: '4px 0 0 0', color: '#71717a', fontSize: '13px' }}>Sector: {activeStock.sector}</p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: priceChange >= 0 ? '#22c55e' : '#ef4444', fontFamily: 'monospace' }}>
                    ${activeStock.current}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: priceChange >= 0 ? '#22c55e' : '#ef4444', marginTop: '2px' }}>
                    {priceChange >= 0 ? '▲' : '▼'} ${Math.abs(priceChange)} ({percentChange}%)
                  </div>
                </div>
              </div>

              {/* TIMEFRAME TIMELINE CONTROLS FILTER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #27272a', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['1D', '1W', '1M', '1Y'].map(tf => (
                    <button 
                      key={tf} 
                      onClick={() => setTimeframe(tf)}
                      style={{ 
                        backgroundColor: timeframe === tf ? '#38bdf8' : 'transparent',
                        color: timeframe === tf ? '#09090b' : '#a1a1aa',
                        border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' 
                      }}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: '12px', color: '#71717a', display: 'flex', alignItems: 'center' }}>
                  Indicators: EMA(20), Volume Matrix
                </div>
              </div>

              {/* RECHARTS CORE SUB-SYSTEM: VISUAL 1 (LINE PRICE) */}
              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activeStock.history} margin={{ left: -10, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="time" stroke="#71717a" fontSize={11} />
                    <YAxis domain={['auto', 'auto']} stroke="#71717a" fontSize={11} tickFormatter={v => `$${v}`} />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', color: '#fff' }} />
                    <Line type="monotone" dataKey="Price" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#38bdf8' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* RECHARTS CORE SUB-SYSTEM: VISUAL 2 (BAR CHART VOLUME SPREADS) */}
              <div style={{ marginTop: '16px', borderTop: '1px dashed #27272a', paddingTop: '16px' }}>
                <div style={{ fontSize: '12px', color: '#71717a', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>Trading Volume Profile</div>
                <div style={{ width: '100%', height: 90 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activeStock.history} margin={{ left: -10, right: 10 }}>
                      <CartesianGrid stroke="#27272a" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="time" hide />
                      <YAxis stroke="#71717a" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', color: '#fff' }} />
                      <Bar dataKey="Volume" fill="rgba(56, 189, 248, 0.3)" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </main>

            {/* TECHNICAL MATRICES FOOTER METRICS GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {[
                { label: "Prev Close Open", val: `$${activeStock.open}` },
                { label: "Session High", val: `$${activeStock.high}`, color: '#22c55e' },
                { label: "Session Low", val: `$${activeStock.low}`, color: '#ef4444' },
                { label: "Aggregate Volume", val: activeStock.volume }
              ].map((m, i) => (
                <div key={i} style={{ backgroundColor: '#18181b', border: '1px solid #27272a', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: '#71717a', fontWeight: '600', textTransform: 'uppercase' }}>{m.label}</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', marginTop: '4px', color: m.color || '#fff', fontFamily: 'monospace' }}>{m.val}</div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN SIDEBAR: WATCHLIST + SYSTEM NEWS AGGREGATOR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* WATCHLIST MANAGER ELEMENT */}
            <div style={{ backgroundColor: '#18181b', borderRadius: '12px', border: '1px solid #27272a', padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '700', borderBottom: '1px solid #27272a', paddingBottom: '10px' }}>Watchlist Feed</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {watchlist.map(ticker => {
                  const stockItem = stocks[ticker];
                  const tickChange = stockItem.current - stockItem.open;
                  return (
                    <div 
                      key={ticker}
                      onClick={() => setSelectedStock(ticker)}
                      style={{ 
                        padding: '12px', backgroundColor: selectedStock === ticker ? '#27272a' : '#1f1f23', 
                        borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        borderLeft: selectedStock === ticker ? '4px solid #38bdf8' : '4px solid transparent', transition: 'all 0.15s'
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: '700', display: 'block', fontSize: '14px' }}>{ticker}</span>
                        <span style={{ fontSize: '11px', color: '#71717a' }}>{stockItem.name.split(' ')[0]}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontWeight: '700', display: 'block', fontSize: '14px', fontFamily: 'monospace' }}>${stockItem.current}</span>
                        <span style={{ fontSize: '11px', fontWeight: '600', color: tickChange >= 0 ? '#22c55e' : '#ef4444' }}>
                          {tickChange >= 0 ? '+' : ''}{((tickChange / stockItem.open) * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* REALISTIC ADDITION: NEWS FEED AGGREGATOR */}
            <div style={{ backgroundColor: '#18181b', borderRadius: '12px', border: '1px solid #27272a', padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '700', borderBottom: '1px solid #27272a', paddingBottom: '10px' }}>Live Market Wire</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {MARKET_NEWS.map(news => (
                  <div key={news.id} style={{ borderBottom: '1px solid #232329', paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '10px', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase' }}>{news.source}</span>
                      <span style={{ fontSize: '10px', color: '#71717a' }}>{news.time}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.4', color: '#d4d4d8' }}>{news.headline}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}