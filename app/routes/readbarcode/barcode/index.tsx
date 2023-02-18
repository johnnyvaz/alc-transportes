import type { ActionArgs } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Outlet, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import TableToPrint from "~/component/tabletoprint";
import TablePrinted from "~/component/tableprinted";
import { requireUserId } from "~/session.server";
import { getRoute, getRouteListItems, getRoutePrintedListItems } from "~/models/route.barcode.server";
import Header from "~/component/header";
import { getConfigPrinter } from "~/models/settings.server";
import type { Setting } from "~/models/settings.server";
import { postPrinter } from "~/services/api";


export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const orderid = formData.get("orderid");
  const route = await getRoute(orderid, userId);
  const setting: Setting = await getConfigPrinter(userId);
  const printer = await postPrinter(setting.address, setting.name, typeof route)
  console.log(" foi pra impressora" + printer);
  return json(route);
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const routeListItems = await getRouteListItems({ userId });
  const routePrintedListItems = await getRoutePrintedListItems({ userId });
  return json({ routeListItems, routePrintedListItems });
}

export default function SearchInput() {
  const actionMessage = useActionData<typeof action>();
  const orderidRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (actionMessage && orderidRef.current) {
      orderidRef.current.select();
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
                            <th className="px-4 py-2">Impresso?</th>
                          </tr>
                          </thead>
                          <tbody className="border-r-2 border-b-2 border-l-2 border-gray-800">
                            <tr key={actionMessage.id}>
                              <td className="px-4 py-2">{actionMessage.orderid}</td>
                              <td className="px-4 py-2">{actionMessage.route}</td>
                              <td className="px-4 py-2">{actionMessage.stop}</td>
                              <td className="px-4 py-2">{actionMessage.printed ? "sim" : "não" }</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6">

                        <table className="table-fixed text-center bg-white overflow-hidden w-full flex-1">
                          <thead>
                          <tr className="bg-gray-800 text-white w-full flex-2">
                            <th className="px-4 py-2 ">ID</th>
                            <th className="px-4 py-2">Pedido</th>
                            <th className="px-4 py-2">Rota</th>
                            <th className="px-4 py-2">Parada</th>
                            <th className="px-4 py-2">Impresso?</th>
                          </tr>
                          </thead>
                          <tbody className="border-r-2 border-b-2 border-l-2 border-gray-800">
                          <tr key="">
                            <td className="px-4 py-2 ">-</td>
                            <td className="px-4 py-2">-</td>
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