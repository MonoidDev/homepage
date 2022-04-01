import React from 'react';

import clsx from 'clsx';

import styles from './Card.module.css';

export interface CardProps extends React.ComponentProps<'div'> {
  backgroundColor?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  color = 'white',
  backgroundColor = 'black',
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'basis-[30%] shrink-0 font-loose cursor-pointer',
        styles.card,
      )}
      style={
        {
          '--card-color': color,
          '--card-background-color': backgroundColor,
        } as React.CSSProperties
      }
    >
      <div className="relative h-0 w-full pt-[150%]">
        <div
          className={clsx(
            'absolute h-full w-full top-0 left-0 overflow-hidden p-[2rem] border-2 rounded-[28px] border-white',
            className,
          )}
          style={{
            backgroundColor: 'var(--card-background-color)',
          }}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
