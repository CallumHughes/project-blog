"use client"
import React, {useEffect, useId, useRef, useState} from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';
import { motion } from 'motion/react'

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef(null);
  const selectContainerId = useId()

 const  handlePlayClick = () => {
   setIsPlaying(!isPlaying);
 }

 const handleResetClick = () => {
   setIsPlaying(false);
   setTimeElapsed(0)
 }

  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setTimeElapsed(timeElapsed + 1) // increase by 1 every second
      }, 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, timeoutRef, timeElapsed]);

  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                    styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>

              {isSelected && (
                <motion.div
                  layoutId={selectContainerId}
                  key={selectContainerId}
                  className={
                    styles.selectedColorOutline
                  }
                />
              )}
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={handlePlayClick}>
            {!isPlaying ? (<><Play />
              <VisuallyHidden>Play</VisuallyHidden></>)
              : (<><Pause /><VisuallyHidden>Pause</VisuallyHidden></>)}
          </button>
          <button onClick={handleResetClick}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
