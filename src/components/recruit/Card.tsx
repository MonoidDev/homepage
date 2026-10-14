import React, { useRef } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import styles from './Card.module.css';

export interface CardProps {
  /** The job detail page this card opens. */
  href: string;
  color?: string;
  backgroundColor?: string;
  className?: string;
  /** Plays the card's animation; called when it gains hover or keyboard focus. */
  onEnter?: () => void;
  /** Reverses the animation once the card has neither hover nor focus. */
  onLeave?: () => void;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  href,
  children,
  color = 'white',
  backgroundColor = 'black',
  className,
  onEnter,
  onLeave,
}) => {
  const active = useRef({ hover: false, focus: false });

  const setActive = (key: 'hover' | 'focus', value: boolean) => {
    const wasActive = active.current.hover || active.current.focus;
    active.current[key] = value;
    const isActive = active.current.hover || active.current.focus;

    if (!wasActive && isActive) onEnter?.();
    if (wasActive && !isActive) onLeave?.();
  };

  return (
    <Link
      href={href}
      // The card's ink inverts on hover/focus, so only the inner layer takes
      // it; the link itself stays white for the shared focus ring (currentColor).
      className="relative block w-[330px] h-[470px] shrink-0 font-loose rounded-[28px] text-white"
      style={
        {
          '--card-color': color,
          '--card-background-color': backgroundColor,
        } as React.CSSProperties
      }
      onMouseEnter={() => setActive('hover', true)}
      onMouseLeave={() => setActive('hover', false)}
      onFocus={() => setActive('focus', true)}
      onBlur={() => setActive('focus', false)}
    >
      <div
        className={clsx(
          'absolute h-full w-full top-0 left-0 overflow-hidden p-[2rem] border-2 rounded-[28px] border-white',
          styles.card,
          className,
        )}
        style={{
          backgroundColor: 'var(--card-background-color)',
        }}
      >
        {children}
      </div>
    </Link>
  );
};
