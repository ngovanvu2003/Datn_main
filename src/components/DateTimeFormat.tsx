import { FormattedDate, FormattedTime } from "react-intl";

interface DateTimeFormatProps {
  value: Date;
  isBreak?: boolean;
  isTime?: boolean;
}

export const DateTimeFormat: React.FC<DateTimeFormatProps> = ({
  value,
  isBreak,
}) => {
  return (
    <div>
      <FormattedTime value={value} />, 
      {isBreak && <br />}
      {" "}<FormattedDate value={value} year="numeric" month="long" day="2-digit" />
    </div>
  );
};
