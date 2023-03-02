import { useFetcher, useLoaderData } from "@remix-run/react";
import type { loader } from "~/routes/readbarcode/index";
import type { LoaderData } from "~/types";

export default function PrinterSelected() {
  const data = useLoaderData<typeof loader>() as LoaderData;
  const fetcher = useFetcher();

  return (
    <main>
      <div className="container p-2">
        <div className="bg-gray-800 text-white text-center justify-center resize p-4 rounded-t-lg
          uppercase">
          Impressora
        </div>
        <div className="border border-gray-400"></div>
        <table className="table-fixed text-center bg-white overflow-hidden w-full flex-1">
          <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Host</th>
            {/*<th className="px-4 py-2">Status</th>*/}
          </tr>
          </thead>
          <tbody className="border-r-2 border-b-2 border-l-2 border-gray-800">
            <tr key={data.setting.id} className="bg-gray-100">
              <td className="px-4 py-2 ">{data.setting.name}</td>
              {/*<td className="px-4 py-2">Status: {data.getPrinter}</td>*/}
              <td> <div
                className="text-xl p-1"
                onBlur={(e) => {
                  const address = String(e.currentTarget.textContent).trim();
                  if (address !== data.setting.address) {
                    fetcher.submit(
                      { address: String(e.target.textContent) },
                      {
                        action: `/readbarcode/${data.setting.address}/update`,
                        method: "post",
                      }
                    );
                  }
                }}
                contentEditable
                dangerouslySetInnerHTML={{
                  __html: fetcher.submission
                    ? (fetcher.submission.formData.get("address") as string)
                    : data.setting.address,
                }}
              />
                {/*<button className="border rounded shadow py-1 px-2" type="button">*/}
                {/*  (pointless button to focus)*/}
                {/*</button>*/}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}