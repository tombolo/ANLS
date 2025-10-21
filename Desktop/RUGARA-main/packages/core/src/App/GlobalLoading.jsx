import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import './GlobalLoading.scss';
import LogoImage from './Logo/ANALYTICS.png';

const GlobalLoading = () => {
    const [progress, setProgress] = useState(0);
    const controls = useAnimation();
    const [showElements, setShowElements] = useState(false);
    const [marketData, setMarketData] = useState({
        eurusd: `1.08${Math.floor(Math.random() * 9)}`,
        btcusd: `6${Math.floor(Math.random() * 9000) + 1000}`,
        sp500: `${Math.floor(Math.random() * 100) + 4500}.${Math.floor(Math.random() * 99)}`,
    });
    const [candleData, setCandleData] = useState([]);
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // New color scheme - Cyberpunk Neon
    const colors = {
        primary: '#00f3ff', // Electric cyan
        secondary: '#ff00ff', // Magenta
        accent: '#00ff88', // Matrix green
        background: '#0a0a14', // Deep space blue
        surface: '#1a1a2e', // Cosmic purple
        text: '#ffffff',
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const generateCandleData = () => {
            const candles = [];
            let baseValue = 100;

            for (let i = 0; i < (isMobile ? 15 : 20); i++) {
                const volatility = 2 + Math.random() * 5;
                const open = baseValue;
                const close = open + (Math.random() - 0.5) * volatility;
                const high = Math.max(open, close) + Math.random() * volatility;
                const low = Math.min(open, close) - Math.random() * volatility;
                const isGrowing = close > open;

                candles.push({ open, high, low, close, isGrowing });
                baseValue = close;
            }

            return candles;
        };

        setCandleData(generateCandleData());

        const marketInterval = setInterval(() => {
            setMarketData({
                eurusd: `1.08${Math.floor(Math.random() * 9)}`,
                btcusd: `${Math.floor(Math.random() * 10) + 60},${Math.floor(Math.random() * 900) + 100}`,
                sp500: `${Math.floor(Math.random() * 100) + 4500}.${Math.floor(Math.random() * 99)}`,
            });
        }, 1500);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + 100 / 150;
                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    clearInterval(marketInterval);
                }
                return newProgress;
            });
        }, 100);

        setTimeout(() => {
            controls.start('visible');
            setShowElements(true);
        }, 500);

        return () => {
            clearInterval(progressInterval);
            clearInterval(marketInterval);
            window.removeEventListener('resize', checkMobile);
        };
    }, [isMobile]);

    return (
        <div className='global-loading' ref={containerRef}>
            {/* Cyber Grid Background */}
            <div className='cyber-grid'>
                {Array.from({ length: isMobile ? 64 : 100 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className='grid-node'
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.02,
                            repeat: Infinity,
                            repeatDelay: Math.random() * 2,
                        }}
                        style={{
                            left: `${(i % 10) * 10}%`,
                            top: `${Math.floor(i / 10) * 10}%`,
                            background: colors.primary,
                        }}
                    />
                ))}
            </div>

            {/* Floating Data Streams */}
            <div className='data-streams'>
                {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className='data-stream'
                        initial={{ y: -100, opacity: 0 }}
                        animate={{
                            y: ['-100%', '200%'],
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: 'linear',
                        }}
                        style={{
                            left: `${i * 8}%`,
                            background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)`,
                            width: '1px',
                        }}
                    />
                ))}
            </div>

            {/* Holographic Rings */}
            {[0, 1, 2].map(ring => (
                <motion.div
                    key={ring}
                    className='holographic-ring'
                    animate={{
                        rotateY: 360,
                        rotateX: ring % 2 === 0 ? 360 : -360,
                    }}
                    transition={{
                        duration: 20 + ring * 5,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    style={{
                        border: `2px solid ${colors.secondary}`,
                        opacity: 0.3 - ring * 0.1,
                    }}
                />
            ))}

            {/* Main Logo */}
            <motion.div
                className='logo-container'
                initial={{ opacity: 0, scale: 0.5, y: -100 }}
                animate={controls}
                variants={{
                    visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                            duration: 1.5,
                            ease: [0.68, -0.55, 0.265, 1.55],
                        },
                    },
                }}
            >
                <motion.div
                    className='logo-hologram'
                    animate={{
                        rotateY: [0, 180, 360],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <div className='logo-frame'>
                        <motion.img
                            src={LogoImage}
                            alt='ANALYTICS'
                            className='logo-image'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        />
                        <div className='hologram-effect'></div>
                    </div>
                </motion.div>

                {/* Energy Pulse */}
                <motion.div
                    className='energy-pulse'
                    animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0.8, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                />
            </motion.div>

            {showElements && (
                <div className='content-wrapper'>
                    {/* Cyber Terminal */}
                    <motion.div
                        className='cyber-terminal'
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <div className='terminal-header'>
                            <div className='terminal-controls'>
                                <span style={{ background: '#ff5f57' }}></span>
                                <span style={{ background: '#ffbd2e' }}></span>
                                <span style={{ background: '#28ca42' }}></span>
                            </div>
                            <span className='terminal-title'>SYSTEM_INIT</span>
                            <span className='terminal-status'>ONLINE</span>
                        </div>
                        <div className='terminal-content'>
                            <motion.div
                                className='terminal-line'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <span className='prompt'>{'>'}</span> Bootstrapping neural network...
                            </motion.div>
                            <motion.div
                                className='terminal-line'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.8 }}
                            >
                                <span className='prompt'>{'>'}</span> Loading quantum algorithms...
                            </motion.div>
                            <motion.div
                                className='terminal-line'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.6 }}
                            >
                                <span className='prompt'>{'>'}</span> Syncing with market data...
                            </motion.div>
                            <motion.div
                                className='terminal-line blinking'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3.4 }}
                            >
                                <span className='prompt'>{'>'}</span> _
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Neural Network Visualization */}
                    <motion.div
                        className='neural-network'
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.7 }}
                    >
                        <div className='network-nodes'>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className='network-node'
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.3, 1, 0.3],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                    style={{
                                        background: colors.accent,
                                    }}
                                />
                            ))}
                        </div>
                        <div className='network-connections'>
                            {Array.from({ length: 12 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className='connection'
                                    animate={{
                                        scaleX: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.1,
                                    }}
                                    style={{
                                        background: colors.primary,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Market Data Display */}
                    <div className='market-display'>
                        <div className='data-panel'>
                            <span className='data-label'>EUR/USD</span>
                            <motion.span
                                className='data-value'
                                key={`eurusd-${marketData.eurusd}`}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {marketData.eurusd}
                            </motion.span>
                            <span className='data-change' style={{ color: colors.accent }}>
                                +0.12%
                            </span>
                        </div>
                        <div className='data-panel'>
                            <span className='data-label'>BTC/USD</span>
                            <motion.span
                                className='data-value'
                                key={`btcusd-${marketData.btcusd}`}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                ${marketData.btcusd}
                            </motion.span>
                            <span className='data-change' style={{ color: colors.secondary }}>
                                -1.24%
                            </span>
                        </div>
                        <div className='data-panel'>
                            <span className='data-label'>S&P 500</span>
                            <motion.span
                                className='data-value'
                                key={`sp500-${marketData.sp500}`}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {marketData.sp500}
                            </motion.span>
                            <span className='data-change' style={{ color: colors.accent }}>
                                +0.68%
                            </span>
                        </div>
                    </div>

                    {/* Quantum Progress */}
                    <div className='quantum-progress'>
                        <div className='progress-container'>
                            <motion.div
                                className='progress-field'
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 15, ease: 'linear' }}
                            >
                                <div className='energy-wave'></div>
                                <div className='particle-field'>
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className='quantum-particle'
                                            animate={{
                                                x: [0, Math.random() * 100 - 50],
                                                y: [0, Math.random() * 20 - 10],
                                                opacity: [0, 1, 0],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                delay: i * 0.4,
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                            <div className='progress-info'>
                                <span className='progress-text'>{Math.round(progress)}%</span>
                                <span className='progress-message'>Initializing quantum analysis...</span>
                            </div>
                        </div>
                    </div>

                    {/* System Indicators */}
                    <div className='system-indicators'>
                        {['CPU', 'RAM', 'NET', 'AI', 'DB'].map((indicator, i) => (
                            <motion.div
                                key={i}
                                className='indicator-unit'
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: [0, 1, 1, 0],
                                    opacity: [0, 1, 1, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                }}
                            >
                                <div className='indicator-glow'></div>
                                <span>{indicator}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Status Display */}
            <motion.div
                className='status-display'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
            >
                <motion.span
                    animate={{
                        textShadow: [
                            `0 0 5px ${colors.primary}`,
                            `0 0 20px ${colors.secondary}`,
                            `0 0 5px ${colors.primary}`,
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                >
                    Quantum financial analysis initializing...
                </motion.span>
            </motion.div>

            {/* Scanner Beam */}
            <motion.div
                className='scanner-beam'
                initial={{ y: '0%' }}
                animate={{ y: '100%' }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
};

export default GlobalLoading;
