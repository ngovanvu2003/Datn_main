import { FormattedDate, FormattedTime } from "react-intl";

export const DateTimeFormat: React.FC<any> = ({ value, isBreak }) => {
  return (
    <div>
      <FormattedTime value={value} />,{isBreak && <br />}{" "}
      <FormattedDate value={value} year="numeric" month="long" day="2-digit" />
    </div>
  );
};
