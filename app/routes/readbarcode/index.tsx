import type { ActionArgs } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Outlet, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import TableToPrint from "~/component/tabletoprint";
import TablePrinted from "~/component/tableprinted";
import { requireUserId } from "~/session.server";
import {
  getRoute,
  getRouteListItems,
  getRoutePrintedListItems,
  Route,
  setRoutePrinted
} from "~/models/route.barcode.server";
import Header from "~/component/header";
import { getPrinter, postPrinter } from "~/services/api";
import type { Setting } from "~/models/settings.server";
import { getConfigPrinter } from "~/models/settings.server";
import PrinterSelected from "~/routes/readbarcode/printerselected";


export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const orderid = formData.get("orderid");
  const route = await getRoute(orderid, userId);
  const setting = await getConfigPrinter(userId);
  await postPrinter(setting?.address, setting?.name, route)
  await setRoutePrinted(route?.id)

  return json(route);
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const setting = await getConfigPrinter(userId);
  const routeListItems = await getRouteListItems({ userId });
  const routePrintedListItems = await getRoutePrintedListItems({ userId });
  return json({ routeListItems, routePrintedListItems, setting, getPrinter });
}

export default function ReadBarcode() {
  const actionMessage = useActionData<typeof action>();
  const orderidRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (actionMessage && orderidRef.current) {
      orderidRef.current.select();
      setTimeout(() => {
        orderidRef.current.value = "";
      }, 2000)
    }

  }, [actionMessage]);

return (
  <main>
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <div className="flex">
        <div className="flex-1 w-auto">
          <div className="container p-2">

            <div className="bg-gray-800 p-8 rounded-lg ">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-center text-white py-2 rounded-t-lg mb-4">
                <h1 className="text-2xl font-medium">Leitura de Código de Barras</h1>
              </div>
              <Form
                method="post"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  width: "100%"
                }}
              >
                <div>
                  <label className="flex w-full flex-col gap-1">
                    <span className="text-center text-white">Código do Pedido</span>
                    <input
                      type="text"
                      name="orderid"
                      ref={orderidRef}
                      className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                    />
                  </label>
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400">
                    Imprimir
                  </button>
                </div>
                <br/>
                <div>
                  <label className="flex w-full flex-col gap-1">
                      <h3 className="text-2xl font-medium text-white text-center">Etiqueta enviada para impressão</h3>
                    {actionMessage ? (
                      <div className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6">
                        <table className="table-fixed text-center bg-white overflow-hidden w-full flex-1">
                          <thead>
                          <tr className="bg-gray-800 text-white w-full flex-2">
                            <th className="px-4 py-2">Pedido</th>
                            <th className="px-4 py-2">Rota</th>
                            <th className="px-4 py-2">Parada</th>
                          </tr>
                          </thead>
                          <tbody className="border-r-2 border-b-2 border-l-2 border-gray-800">
                            <tr key={actionMessage.id}>
                              <td className="px-4 py-2">{actionMessage.orderid}</td>
                              <td className="px-4 py-2">{actionMessage.route}</td>
                              <td className="px-4 py-2">{actionMessage.stop}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6">

                        <table className="table-fixed text-center bg-white overflow-hidden w-full flex-1">
                          <thead>
                          <tr className="bg-gray-800 text-white w-full flex-2">
                            <th className="px-4 py-2">Pedido</th>
                            <th className="px-4 py-2">Rota</th>
                            <th className="px-4 py-2">Parada</th>
                          </tr>
                          </thead>
                          <tbody className="border-r-2 border-b-2 border-l-2 border-gray-800">
                          <tr key="">
                            <td className="px-4 py-2">-</td>
                            <td className="px-4 py-2">-</td>
                            <td className="px-4 py-2">-</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    )
                    }
                  </label>
                </div>
              </Form>

            </div>
          </div>
          <PrinterSelected />
        </div>
        <div className="flex-1 w-auto">
          <TableToPrint />
          <TablePrinted />
        </div>
      </div>
    </div>
    <Outlet />
  </main>
);
}


