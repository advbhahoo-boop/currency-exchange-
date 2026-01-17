
import { Currency, CurrencyMetadata } from '../types';

export const RATES_VS_USD: Record<Currency, number> = {
  USD: 1,
  AED: 3.67,
  EUR: 0.92,
  GBP: 0.79,
  KWD: 0.30,
  CHF: 0.89,
};

export const CURRENCY_METADATA: Record<Currency, CurrencyMetadata> = {
  USD: { name: 'US Dollar', flag: '🇺🇸' },
  AED: { name: 'UAE Dirham', flag: '🇦🇪' },
  EUR: { name: 'Euro', flag: '🇪🇺' },
  GBP: { name: 'British Pound', flag: '🇬🇧' },
  KWD: { name: 'Kuwaiti Dinar', flag: '🇰🇼' },
  CHF: { name: 'Swiss Franc', flag: '🇨🇭' },
};

export function convert(amount: number, from: Currency, to: Currency): number {
  if (from === to) return amount;

  // First, convert 'from' amount to USD
  const amountInUSD = amount / RATES_VS_USD[from];

  // Then, convert from USD to 'to' amount
  const result = amountInUSD * RATES_VS_USD[to];

  return result;
}

export function formatCurrency(amount: number, currency: Currency): string {
    return new Intl.NumberFormat('en-US', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}
