import { Form, useActionData } from "@remix-run/react";
import Header from "~/component/header";
import { Outlet } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { createRoute } from "~/models/route.server";
import { useEffect, useRef, useState } from "react";


export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const body = formData.get("body");

  if (typeof body !== "string" || body.length === 0) {
    return json({ errors: { body: "O campo Body é obrigatório" } }, { status: 400 });
  }

  const lines = body.split('\n')
  let routeInserted = 0
  lines.forEach(line => {
    const columns = line.split(';');
    const orderid = columns[0]
    const route = parseInt(columns[1])
    const stop = columns[2]
    if (!orderid || !route || isNaN(route)) {
      return json({ errors: { dataRoute: "Os dados da rota estão incompletos ou inválidos" } }, { status: 400 });
    }

    const dataRoute = {
      orderid,
      route,
      stop,
    }
    createRoute(dataRoute.orderid, dataRoute.route, dataRoute.stop, userId)
    routeInserted = routeInserted +1
  })

  return redirect("/readbarcode")
};


export default function ImportCsv() {
  const [showAlert, setShowAlert] = useState(false);
  const actionMessage = useActionData<typeof action>();
  const bodyRef = useRef<HTMLInputElement>(null);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  useEffect(() => {
    if (actionMessage && bodyRef.current ) {
      bodyRef.current.value = ""
      handleShowAlert();
    }
  }, [actionMessage]);


  return (
    <main>
      <div className="flex h-full min-h-screen flex-col">
        <Header />
        <div className="flex">
          <div className="w-auto flex-1">
            <div className="container p-2">
              <div className="rounded-lg bg-gray-800 p-8 ">
                <div className="mb-4 rounded-t-lg bg-gradient-to-r from-purple-500 to-blue-500 py-2 text-center text-white">
                  <h1 className="text-2xl font-medium">
                    Importar arquivo CSV
                  </h1>
                </div>
                <div>
                  <Form
                    method="post"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      width: "100%",
                    }}
                  >
                    <div>
                      <label className="flex w-full flex-col gap-1">
                        <div className="text-white text-1xl text-center">Pedido;Rota;Parada</div>
                        <div className="text-white text-1xl text-center">Importar nesse formato: texto;número;texto</div>
                        <textarea
                          name="body"
                          rows={8}
                          className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
                        ></textarea>
                      </label>
                    </div>
                    <div className="text-white text-1xl text-center">Quantidade máxima = 500 linhas</div>
                    <div className="text-right">
                      <button
                        type="submit"
                        className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                      >
                        Salvar
                      </button>
                    </div>
                  </Form>

                </div>
              </div>
            </div>
          </div>
          <div className="w-auto flex-1"></div>
        </div>
      </div>
      <Outlet />
    </main>
  );
}
