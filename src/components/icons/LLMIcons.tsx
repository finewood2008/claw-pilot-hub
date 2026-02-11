import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const GeminiIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C12 2 14.5 7.5 17 10C19.5 12.5 22 12 22 12C22 12 19.5 11.5 17 14C14.5 16.5 12 22 12 22C12 22 9.5 16.5 7 14C4.5 11.5 2 12 2 12C2 12 4.5 12.5 7 10C9.5 7.5 12 2 12 2Z" fill="url(#gemini-grad)" />
    <defs>
      <linearGradient id="gemini-grad" x1="2" y1="2" x2="22" y2="22">
        <stop stopColor="#4285F4" />
        <stop offset="0.5" stopColor="#9B72CB" />
        <stop offset="1" stopColor="#D96570" />
      </linearGradient>
    </defs>
  </svg>
);

export const OpenAIIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
  </svg>
);

export const QwenIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#qwen-grad)" />
    <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Q</text>
    <defs>
      <linearGradient id="qwen-grad" x1="2" y1="2" x2="22" y2="22">
        <stop stopColor="#6C5CE7" />
        <stop offset="1" stopColor="#A855F7" />
      </linearGradient>
    </defs>
  </svg>
);

export const ClaudeIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14.957 4.386l-6.87 15.228h3.476l6.87-15.228h-3.476zm-7.435 0L.652 19.614h3.477l6.87-15.228H7.522z" />
  </svg>
);

export const DeepSeekIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#ds-grad)" />
    <path d="M8 12C8 9.8 9.8 8 12 8C14.2 8 16 9.8 16 12C16 14.2 14.2 16 12 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2" fill="white" />
    <defs>
      <linearGradient id="ds-grad" x1="2" y1="2" x2="22" y2="22">
        <stop stopColor="#4FC3F7" />
        <stop offset="1" stopColor="#0288D1" />
      </linearGradient>
    </defs>
  </svg>
);

export const LlamaIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#llama-grad)" />
    <path d="M9 8V16M12 6V16M15 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="llama-grad" x1="2" y1="2" x2="22" y2="22">
        <stop stopColor="#FF8F00" />
        <stop offset="1" stopColor="#FFB300" />
      </linearGradient>
    </defs>
  </svg>
);
