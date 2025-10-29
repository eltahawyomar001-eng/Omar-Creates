import * as React from 'react';

interface LogoOCProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Omar Creates Logo - Clean 'OC' mark
 * Responsive to theme changes via currentColor
 */
export function LogoOC({ className, width = 48, height = 48 }: LogoOCProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Omar Creates"
    >
      <g>
        {/* O */}
        <path
          d="M13 24C13 18.4772 17.4772 14 23 14C28.5228 14 33 18.4772 33 24C33 29.5228 28.5228 34 23 34C17.4772 34 13 29.5228 13 24Z"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* C */}
        <path
          d="M43 19C41.3431 16.2386 38.3284 14 34.5 14C29.2533 14 25 18.4772 25 24C25 29.5228 29.2533 34 34.5 34C38.3284 34 41.3431 31.7614 43 29"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
