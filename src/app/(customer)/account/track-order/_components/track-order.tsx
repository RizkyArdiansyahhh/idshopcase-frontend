/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";

export const TrackingOrderResponse = ({ tracking }: any) => {
  const history = tracking.history || [];

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card className="shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Tracking #: {tracking.awb}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Order ID: {tracking.orderid}
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {/* Pengirim */}
          <div>
            <h3 className="font-semibold text-primary">Pengirim</h3>
            <p>{tracking.detail.sender.name}</p>
            <p className="text-sm text-muted-foreground">
              {tracking.detail.sender.addr}
            </p>
          </div>

          {/* Penerima */}
          <div>
            <h3 className="font-semibold text-primary">Penerima</h3>
            <p>{tracking.detail.receiver.name}</p>
            <p className="text-sm text-muted-foreground">
              {tracking.detail.receiver.addr}
            </p>
          </div>

          {/* Barang */}
          <div>
            <h3 className="font-semibold text-primary">Detail Barang</h3>
            <p>{tracking.detail.itemname}</p>
            <p className="text-sm text-muted-foreground">
              {tracking.detail.note}
            </p>
          </div>

          <hr />

          {/* History */}
          <div>
            <h3 className="font-semibold mb-2">Riwayat Pengiriman</h3>

            {history.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Belum ada riwayat pengiriman.
              </p>
            )}

            <div className="flex flex-col gap-4">
              {history.map(
                (
                  h: {
                    status:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                    city_name:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                    date_time:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  },
                  i: Key | null | undefined
                ) => (
                  <div
                    key={i}
                    className="p-3 border rounded-md bg-muted/40 shadow-sm"
                  >
                    <p className="font-semibold text-primary">{h.status}</p>
                    <p className="text-sm">{h.city_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {h.date_time}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
