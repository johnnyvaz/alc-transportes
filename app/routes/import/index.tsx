import * as React from "react";
import type { ActionArgs, UploadHandler } from "@remix-run/node";
import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createFileUploadHandler as createFileUploadHandler,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";

export const action = async ({ request }: ActionArgs) => {
  const uploadHandler: UploadHandler = composeUploadHandlers(
    createFileUploadHandler({
      directory: "public/uploads",
      maxPartSize: 30000,
    }),
    createMemoryUploadHandler()
  );
  const formData = await parseMultipartFormData(request, uploadHandler);
  const filecsv:FormDataEntryValue | null = formData.get("filecsv");
  if (!filecsv || typeof filecsv === "string") {
    return json({ error: "something wrong" });
  }
  const name = filecsv.name;
  return json({
    nome: name
  });
};

export default function Index() {
  const { nome } = useActionData<typeof action>() || {};
  const [csv, setCsv] = useState();
  function tabela() {
    return (
      <tr>
        <td className="px-4 py-2">{csv}</td>
        <td className="px-4 py-2">{"row.route"}</td>
        <td className="px-4 py-2">{"row.stop"}</td>
      </tr>
      )
  }

  React.useEffect(() => {
    if (nome) {
      fetch(`uploads/${nome}`)
        .then((r) => r.text())
        .then((text) => {
          // let lines = text.split("\n");
          console.log("linhas" + text);
        })
    }
  }, [nome]);

  return (
    <main>
      <div className="container p-2">
        <div className="bg-gray-800 text-white text-center justify-center resize p-4 rounded-t-lg
          uppercase">
          Importar Arquivo CSV
        </div>
        <div className="border border-gray-400 p-4">
        <Form method="post" encType="multipart/form-data">
          <input type="file" name="filecsv" accept=".csv"
                 className="rounded bg-orange-400  py-2 px-4 text-white hover:bg-orange-800"
          />
          <button
            type="submit"
            className="rounded bg-blue-500 mx-2 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400">
            Upload
          </button>
        </Form>
        </div>
        <div className="border border-gray-400 p-4">
          {/*{data?.error ? <h2>{data.error}</h2> : null}*/}

          {/*{data?.image ? (*/}
          {/*  <>*/}
          {/*    <h2>uploaded image</h2>*/}
          {/*    <img alt="uploaded" src={data.imgSrc} />*/}
          {/*  </>*/}
          {/*) : null}*/}

          <p>Arquivo: {nome}</p>
        </div>
        <table className="table-fixed text-center bg-white overflow-hidden w-full flex-1">
          <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Pedido</th>
            <th className="px-4 py-2">Rota</th>
            <th className="px-4 py-2">Parada</th>
          </tr>
          </thead>
          <tbody className="border-r-2 border-b-2 border-l-2 border-gray-800">
          {/*{data.routeListItems.map((row, index) => (*/}
          {/*  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>*/}

            {/*</tr>*/}
          {/*))}*/}
          </tbody>
        </table>
      </div>
    </main>
  );
}
