import { Form } from "@remix-run/react";
import { useState } from "react";
import Header from "~/component/header";
import { Outlet } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/node";
import { requireUserId } from "~/session.server";


export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const body = formData.get("body");

  if (typeof body !== "string" || body.length === 0) {
    return json({ errors: { body: "Body is required" } }, { status: 400 });
  }
  const lines = body.split('\n')
  lines.forEach(line => {
    const columns = line.split(';');
    const dataRoute = {
      orderid: columns[0],
      route: columns[1],
      stop: columns[2]
    }
    console.log("dataroutes :" + dataRoute)
    // const routes = await createRoute({ title, body, userId });
  })

  return json({lines: lines})

};


export default function ImportCsv() {
  const [csv, setCsv] = useState();
  const [clientejson, setClientejson] = useState([]);

  // function renderizarDados() {
  //   return clientejson?.map((cliente, i) => {
  //     return (
  //       <tr
  //         key={cliente.id}
  //         className={`${
  //           i % 2 === 0 ? "bg-gray-900" : "bg-gray-700"
  //         } rounded-xl border-2 border-gray-500`}
  //       >
  //         <td className="p-2 text-left">{cliente.nome}</td>
  //         <td className="p-2 text-left">{cliente.apelido}</td>
  //       </tr>
  //     );
  //   });
  // }



  const handleReadString = () => {
    let lines = csv.split("\n");
    let result = [];
    let headers = ["nome", "apelido"];
    let headersInput = lines[0].split(";");
    headers.forEach((e, i) => {
      if (e != headersInput[i]) {
        console.log("true");
        alert("Ajuste o arquivo");
      }
    });
    for (var i = 1; i < lines.length; i++) {
      var cliente = {};
      var currentline = lines[i].split(";");
      for (var j = 0; j < headers.length; j++) {
        cliente[headers[j]] = currentline[j];
      }
      result.push(cliente);
    }
    formatarCliente(result);
  };

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
                        <span>pedido;rota;parada</span>
                        <textarea
                          name="body"
                          rows={8}
                          className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
                        ></textarea>
                      </label>
                    </div>

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
