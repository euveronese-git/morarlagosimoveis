import React from 'react';
import { COMPANY_NAME, CRECI_LABEL } from '../utils/whatsapp';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  asImage?: string;
  tone?: 'default' | 'on-dark';
}

function HouseWaveIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 16.2 18 7.4l11 8.8"
        stroke="#C9A24B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2 15.6V26h15.6V15.6"
        stroke="#C9A24B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 26v-5.6h4V26"
        stroke="#C9A24B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 31.2c2.5-1.7 4-1.7 6.4 0s3.9 1.7 6.4 0 3.9-1.7 6.4 0 3.8 1.7 6.3 0"
        stroke="#1E6FD9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  asImage,
  tone = 'default',
}) => {
  const nameColor = tone === 'on-dark' ? 'text-white' : 'text-primary';
  const subColor = tone === 'on-dark' ? 'text-white/85' : 'text-primary';
  const creciColor = tone === 'on-dark' ? 'text-white/65' : 'text-text-secondary';

  const iconSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-[clamp(2rem,5vw,2.5rem)] h-[clamp(2rem,5vw,2.5rem)]',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  };

  const wordSizeClasses = {
    sm: 'text-[0.95rem]',
    md: 'text-[clamp(1rem,2.6vw,1.35rem)]',
    lg: 'text-[1.7rem]',
    xl: 'text-[2rem]',
  };

  if (asImage) {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src={asImage}
          alt={COMPANY_NAME}
          className="h-[clamp(3.25rem,8vw,4.5rem)] w-auto max-w-[11rem] sm:max-w-[16rem] object-contain object-left"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 min-w-0 ${className}`}>
      <HouseWaveIcon className={`${iconSizeClasses[size]} shrink-0`} />
      <div className="min-w-0 leading-none">
        <p className={`font-heading font-semibold tracking-tight ${wordSizeClasses[size]} whitespace-nowrap`}>
          <span className={nameColor}>MORAR</span>
          <span className="text-accent">LAGOS</span>
        </p>
        <p className="mt-1 flex items-center gap-1.5">
          <span className="h-px w-[0.7rem] sm:w-[1.15rem] bg-accent shrink-0" aria-hidden="true" />
          <span
            className={`font-heading font-semibold uppercase leading-none text-[0.52rem] min-[380px]:text-[0.58rem] sm:text-[0.64rem] tracking-[0.22em] min-[400px]:tracking-[0.32em] ${subColor}`}
          >
            IMÓVEIS
          </span>
          <span className="h-px w-[0.7rem] sm:w-[1.15rem] bg-accent shrink-0" aria-hidden="true" />
        </p>
        <p className={`mt-1 text-[0.58rem] min-[380px]:text-[0.62rem] tracking-[0.08em] ${creciColor}`}>
          {CRECI_LABEL}
        </p>
      </div>
    </div>
  );
};
