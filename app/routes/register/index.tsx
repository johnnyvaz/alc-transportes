import { useState } from "react";
import Header from "~/component/header";
import { Outlet } from "@remix-run/react";

export default function ImportCsv() {
  const [csv, setCsv] = useState();
  const [clientejson, setClientejson] = useState([]);

  function formatarCliente(clientejson: any) {
    setClientejson(clientejson);
    console.log("clientejson", clientejson);
  }

  function renderizarCabecalho() {
    return (
      <tr className="resize:none rounded-lg border-2 border-gray-500 ">
        <th className="p-2 text-left">Pedido</th>
        <th className="p-2 text-left">Rota</th>
        <th className="p-2 text-left">Parada</th>
      </tr>
    );
  }

  const totalAImportar = clientejson.length;

  function renderizarDados() {
    return clientejson?.map((cliente, i) => {
      return (
        <tr
          key={cliente.id}
          className={`${
            i % 2 === 0 ? "bg-gray-900" : "bg-gray-700"
          } rounded-xl border-2 border-gray-500`}
        >
          <td className="p-2 text-left">{cliente.nome}</td>
          <td className="p-2 text-left">{cliente.apelido}</td>
        </tr>
      );
    });
  }

  const handleAlterarCsv = () => {
    setCsv(null);
  };

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
                  <table className="w-80 bg-gray-200">
                    <thead
                      className={`border-coolGray-800 shadow-input resize:none rounded-lg border
                      font-normal text-gray-800 outline-none focus:border-green-500`}
                    >
                      {renderizarCabecalho()}
                    </thead>
                    <tbody>{renderizarDados()}</tbody>
                  </table>

                  <div>
                    {/*<textarea*/}
                    {/*  className="block w-full h-64 p-2 text-base text-coolGray-900*/}
                    {/*        font-normal outline-none focus:border-green-500 border border-coolGray-200*/}
                    {/*        rounded-lg shadow-input text-gray-800"*/}
                    {/*  id="input"*/}
                    {/*  placeholder="apelido;nome"*/}
                    {/*  value={csv}>*/}
                    {/*    </textarea>*/}
                    <div className="mt-7 flex justify-end">
                      <button
                        className="btn hover:text-coolGray-500 shadow-button mb-6 flex w-full flex-wrap justify-center
                        rounded-md border px-4 py-2"
                        onClick={(_) => handleAlterarCsv()}
                      >
                        Validar registros
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn hover:text-coolGray-500 shadow-button m-4 mb-6 flex w-full flex-wrap
                justify-center rounded-md border py-2"
                    onClick={(_) => {}}
                  >
                    Clique aqui para importar {totalAImportar} arquivos
                  </button>
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
