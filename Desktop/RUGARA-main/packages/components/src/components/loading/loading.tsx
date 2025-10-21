import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import Text from '../text/text';
import LoadingDTraderV2 from './loading-dtrader-v2';

export type TLoadingProps = React.HTMLProps<HTMLDivElement> & {
    is_fullscreen: boolean;
    is_slow_loading: boolean;
    status: string[];
    theme: string;
    progress?: number;
    showPercentage?: boolean;
};

const Loading = ({ className, id, is_fullscreen = true, is_slow_loading, status, theme, progress, showPercentage = true }: Partial<TLoadingProps>) => {
    const [currentProgress, setCurrentProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
    const [particleCount, setParticleCount] = useState(30);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Fluid animation particles
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            life: number;
        }> = [];

        // Create gradient colors
        const colors = [
            'rgba(0, 168, 255, 0.8)',
            'rgba(255, 215, 0, 0.8)',
            'rgba(255, 107, 107, 0.8)',
            'rgba(138, 43, 226, 0.8)',
            'rgba(0, 255, 163, 0.8)'
        ];

        // Create initial particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: Math.random() * 100
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life += 0.5;

                // Bounce off edges
                if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
                if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

                // Draw particle with glow
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                // Add glow effect
                ctx.shadowColor = particle.color;
                ctx.shadowBlur = 15;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Draw connections between nearby particles
                particles.forEach((otherParticle, otherIndex) => {
                    if (index !== otherIndex) {
                        const dx = particle.x - otherParticle.x;
                        const dy = particle.y - otherParticle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
                            ctx.lineWidth = 0.5;
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(otherParticle.x, otherParticle.y);
                            ctx.stroke();
                        }
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [particleCount]);

    useEffect(() => {
        if (progress !== undefined) {
            setCurrentProgress(progress);
            if (progress >= 100) {
                setTimeout(() => setIsComplete(true), 500);
            }
        } else {
            const interval = setInterval(() => {
                setCurrentProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setIsComplete(true), 500);
                        return 100;
                    }
                    return Math.min(100, prev + Math.random() * (100 - prev) * 0.15 + 2);
                });
            }, 150);

            return () => clearInterval(interval);
        }
    }, [progress]);

    // Cycle through status messages with typewriter effect
    const [displayedStatus, setDisplayedStatus] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (status && status.length > 0) {
            setIsTyping(true);
            setDisplayedStatus('');

            const currentStatus = status[currentStatusIndex];
            let charIndex = 0;

            const typeInterval = setInterval(() => {
                if (charIndex <= currentStatus.length) {
                    setDisplayedStatus(currentStatus.slice(0, charIndex));
                    charIndex++;
                } else {
                    setIsTyping(false);
                    clearInterval(typeInterval);

                    // Move to next status after delay
                    setTimeout(() => {
                        setCurrentStatusIndex(prev => (prev + 1) % status.length);
                    }, 2000);
                }
            }, 50);

            return () => clearInterval(typeInterval);
        }
    }, [status, currentStatusIndex]);

    const displayProgress = progress !== undefined ? progress : currentProgress;

    return (
        <div
            data-testid='dt_initial_loader'
            className={classNames('dc-loading', className, {
                'dc-loading--fullscreen': is_fullscreen,
                'dc-loading--complete': isComplete,
                'dc-loading--slow': is_slow_loading,
            })}
            id={id}
        >
            {/* Animated background canvas */}
            <canvas
                ref={canvasRef}
                className="dc-loading__canvas"
            />

            {/* Holographic rings */}
            <div className="dc-loading__rings">
                {[1, 2, 3].map(ring => (
                    <div
                        key={ring}
                        className={`dc-loading__ring dc-loading__ring--${ring}`}
                    />
                ))}
            </div>

            <div className='dc-loading__container'>
                {/* Central orb with pulsating effect */}
                <div className='dc-loading__orb'>
                    <div className='dc-loading__orb-core' />
                    <div className='dc-loading__orb-glow' />
                    <div className='dc-loading__orb-particles'>
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className={`dc-loading__orb-particle dc-loading__orb-particle--${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Circular progress indicator */}
                <div className='dc-loading__circular-progress'>
                    <svg className='dc-loading__progress-svg' viewBox="0 0 100 100">
                        <circle
                            className='dc-loading__progress-bg'
                            cx="50"
                            cy="50"
                            r="45"
                        />
                        <circle
                            className='dc-loading__progress-fill'
                            cx="50"
                            cy="50"
                            r="45"
                            strokeDasharray={283}
                            strokeDashoffset={283 - (283 * displayProgress) / 100}
                        />
                    </svg>

                    {showPercentage && (
                        <div className='dc-loading__percentage'>
                            <span className='dc-loading__percentage-number'>
                                {Math.round(displayProgress)}
                            </span>
                            <span className='dc-loading__percentage-symbol'>%</span>
                        </div>
                    )}
                </div>

                {/* Status text with advanced typing animation */}
                {status && status.length > 0 && (
                    <div className='dc-loading__status'>
                        <Text size='m' color='prominent' className='dc-loading__status-text'>
                            {displayedStatus}
                            <span className={`dc-loading__cursor ${isTyping ? 'typing' : 'blinking'}`}>
                                █
                            </span>
                        </Text>
                    </div>
                )}

                {/* Advanced loading indicators */}
                <div className='dc-loading__indicators'>
                    <div className='dc-loading__frequency-bars'>
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className={`dc-loading__frequency-bar dc-loading__frequency-bar--${i + 1}`}
                            />
                        ))}
                    </div>

                    <div className='dc-loading__binary-stream'>
                        {[...Array(20)].map((_, i) => (
                            <span
                                key={i}
                                className='dc-loading__binary-digit'
                            >
                                {Math.round(Math.random())}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating tech elements */}
            <div className='dc-loading__tech-elements'>
                {['⟁', '⧈', '⬡', '⧄', '⌬'].map((symbol, i) => (
                    <div
                        key={i}
                        className={`dc-loading__tech-element dc-loading__tech-element--${i + 1}`}
                    >
                        {symbol}
                    </div>
                ))}
            </div>
        </div>
    );
};

Loading.DTraderV2 = LoadingDTraderV2;

export default Loading;