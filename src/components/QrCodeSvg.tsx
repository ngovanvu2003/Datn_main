import { FC } from "react";

interface QrCodeSvgProps {
  value: string | TrustedHTML | undefined;
}

const QrCodeSvg: FC<QrCodeSvgProps> = ({ value }: any) => {
  return <div dangerouslySetInnerHTML={{ __html: value }} />;
};

export default QrCodeSvg;
