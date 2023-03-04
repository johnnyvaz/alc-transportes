import { useLoaderData } from "@remix-run/react";
import type { loader } from "~/routes/readbarcode";
import type { LoaderData } from "~/types";
import { useState } from "react";


export default function TableToPrint() {
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 15;
  const indexOfLastRow = currentPage * ROWS_PER_PAGE;
  const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
  const data = useLoaderData<typeof loader>() as LoaderData;
  const totalRows = data.routeListItems.length;
  const totalPages = Math.ceil(data.routeListItems.length / ROWS_PER_PAGE);


  return (
    <main>
      <div className="container p-2">
        <div className="bg-gradient-to-r from-purple-900 to-blue-800 text-center text-white py-2 rounded-t-lg">
          <h1 className="text-2xl font-medium">Etiquetas para imprimir</h1>
        </div>
        <div className="border border-gray-400"></div>
        <table className="table-fixed text-center bg-white overflow-hidden w-full flex-1">
          <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Pedido</th>
            <th className="px-4 py-2">Rota</th>
            <th className="px-4 py-2">Parada</th>
          </tr>
          </thead>
          <tbody className="border-r-2 border-b-2 border-l-2 border-gray-800">
          {data.routeListItems.slice(indexOfFirstRow, indexOfLastRow).map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="px-4 py-2">{row.orderid}</td>
              <td className="px-4 py-2">{row.route}</td>
              <td className="px-4 py-2">{row.stop}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className="flex justify-center border-r-2 border-b-2 border-l-2 border-gray-800">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l"
          >
            Anterior
          </button>
          <div className="flex items-center mx-2">
            <span className="mr-2">{`Mostrando ${indexOfFirstRow + 1}-${Math.min(indexOfLastRow, totalRows)} de ${totalRows} registros`}</span>
          </div>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r"
          >
            Próxima
          </button>
        </div>
      </div>
    </main>
  )
}