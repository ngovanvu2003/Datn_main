import { FormattedNumber } from "react-intl";

export const CurrencyFormat: any = ({ value }: any) => {
  return (
    <FormattedNumber
      value={value}
      style="currency"
      currency="VND"
      minimumFractionDigits={0}
    />
  );
};
