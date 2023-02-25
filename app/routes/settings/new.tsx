// import type { ActionFunction, LoaderArgs, LoaderFunction } from "@remix-run/node";
// import { json, redirect } from "@remix-run/node";
// import { Form, useLoaderData, useParams, useTransition } from "@remix-run/react";
// import { createConfigPrinter } from "~/models/settings.server";
// import { requireUserId } from "~/session.server";
// import React, { useState } from "react";
// import { getPrinter } from "~/services/api";
//
// export const loader: LoaderFunction = async ({ params }) => {
//   const data = await getPrinter(params.host);
//   console.log("3" + data)
//   return {
//     host: params.host,
//     printers: data
//   };
// };
// export const getApi = async (host:string) => {
//   const data = await getPrinter(host);
//   console.log("4" + data)
// };
//
//
// export const action: ActionFunction = async ({ request }) => {
//   const userId = await requireUserId(request);
//
//   const formData = await request.formData();
//   const name = formData.get("name");
//   const address = formData.get("address");
//
//   const data = await getPrinter("192.168.1.2");
//   console.log("4" + data)
//
//   if (typeof name !== "string" || name.length === 0) {
//     return json({ errors: { name: "Name printer is required" } }, { status: 400 });
//   }
//
//   if (typeof address !== "string" || address.length === 0) {
//     return json({ errors: { address: "printer address is required" } }, { status: 400 });
//   }
//
//   const setting = await createConfigPrinter({ name, address, userId });
//   return redirect(`/settings/${setting.id}`);
// };
//
// export default function NewSettings() {
//   const { host, printers } = useLoaderData<typeof loader>();
//   return (
//     <div>
//
//       <Form
//         method="post"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 8,
//           width: "100%",
//         }}
//       >
//         <label className="flex w-full flex-col gap-1">
//           <span>Selecione a Impressora: </span>
//
//         </label>
//         <div>
//           <label className="flex w-full flex-col gap-1">
//             <span>Endereço da Impressora: </span>
//             <input
//               name="address"
//               disabled={true}
//               value={host}
//               className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
//             ></input>
//           </label>
//         </div>
//
//         <div className="text-right">
//           <button
//             type="submit"
//             onClick={(e) => getApi(host) }
//             className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
//           >
//             Buscar Impressora
//           </button>
//           <button
//             type="submit"
//             className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
//           >
//             Salvar
//           </button>
//         </div>
//       </Form>
//     </div>
//   );
// }