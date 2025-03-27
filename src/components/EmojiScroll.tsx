import React, { useRef, useEffect, useState, useMemo } from 'react';

interface EmojiScrollProps {
  emojis: string[];
}

const EmojiScroll: React.FC<EmojiScrollProps> = ({ emojis }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let startTime: number | null = null;

    const smoothScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      // スクロール速度を調整（ここでは1ピクセル/フレーム）
      const newPosition = (scrollPosition + 1) % container.scrollWidth;
      setScrollPosition(newPosition);

      // 60fpsを目指す
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollPosition]);

  // メモ化してパフォーマンスを最適化
  const renderedEmojis = useMemo(() => {
    return emojis.map((emoji, index) => (
      <span key={index} className="emoji-item">
        {emoji}
      </span>
    ));
  }, [emojis]);

  return (
    <div
      ref={containerRef}
      className="emoji-scroll-container"
      style={{
        transform: `translateX(-${scrollPosition}px)`,
        willChange: 'transform',
      }}
    >
      {renderedEmojis}
    </div>
  );
};

export default EmojiScroll;