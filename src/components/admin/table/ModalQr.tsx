import { FC, useEffect, useState } from "react";
import QrCodeSvg from "../../QrCodeSvg";
import { ITable } from "../../../interface/table";
import { useGetOrdersOptionQuery } from "../../../api/order";

type ModalQrProps = {
  value: ITable;
};

const ModalQr: FC<ModalQrProps> = ({ value }) => {
  const [orderInTable, setOrderInTable] = useState<any[]>([]);

  const { data: orderApi } = useGetOrdersOptionQuery(
    `?orderBy=id&order_status=0&table_id=${value.id}`
  );

  useEffect(() => {
    setOrderInTable(orderApi?.data.data);
  }, [orderApi?.data.data]);

  return (
    <div className="modal fade" id={`qr-modal-${value.id}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          {/* modal body */}
          {value.table_status == "0" ? (
            <div
              id="modal-body"
              className="flex flex-col gap-5 justify-center items-center mb-5"
            >
              <QrCodeSvg value={value.qr_code} />
              <div className="text-xl font-bold">{value.name}</div>
            </div>
          ) : (
            <div
              id="modal-body"
              className="flex gap-10 justify-center items-start mb-6"
            >
              <QrCodeSvg value={value.qr_code} />
              <div className="flex flex-col gap-y-2">
                <div className="text-xl font-bold">{value.name}</div>
                {orderInTable?.map((item: any, index: number) => {
                  if (index == 0) {
                    return (
                      <div className="flex flex-col">
                        <p className="border-t border-gray-200  pt-2 text-sm font-semibold">
                          Khách đang ngồi
                        </p>
                        <div
                          className="pt-2 flex gap-2 text-xl font-semibold"
                          key={index}
                        >
                          <div className="relative w-12 h-12">
                            <img
                              src="/images/placeholder.jpg"
                              className="w-full rounded-full object-cover"
                              alt=""
                            />
                            <span className="absolute bottom-0 right-0 border-2 border-white w-3 h-3 bg-green-500 rounded-full"></span>
                          </div>
                          <p className="flex flex-col gap-1 text-sm pt-1 text-gray-800">
                            <span>{item?.username}</span>
                            <span className="text-xs pt-1 text-gray-800">
                              {item?.phone}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}
          {/* end modal body */}
        </div>
      </div>
    </div>
  );
};

export default ModalQr;
