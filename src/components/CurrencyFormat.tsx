import { FormattedNumber } from "react-intl";

interface CurrencyFormatProps {
  value: number;
}

export const CurrencyFormat: React.FC<CurrencyFormatProps> = ({ value }) => {
  return (
    <FormattedNumber
      value={value}
      style="currency"
      currency="VND"
      minimumFractionDigits={0}
    />
  );
};
