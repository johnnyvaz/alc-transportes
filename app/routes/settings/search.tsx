// import type { ActionFunction } from "@remix-run/node";
// import { json, redirect } from "@remix-run/node";
// import { Form, useLoaderData } from "@remix-run/react";
// import React from "react";
// import { getPrinter } from "~/services/api";
//
// export const loader = async () => {
//   const host = "http://192.168.1.2";
//   const result = json(
//     await getPrinter(host)
//   )
//   console.log("result 2" + {result})
//   return result;
// }
//
// export default function Search() {
//   const data = useLoaderData<typeof loader>();
//   return (
//     <div>
//       <h1>Insira o Host</h1>
//       <button
//         type="submit"
//         onClick={(e) => getApi("192.168.1.2") }
//         className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
//       >
//         Buscar Impressora
//       </button>
//       <Form
//         method="post"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 8,
//           width: "100%",
//         }}
//       >
//         <div>
//           <label className="flex w-full flex-col gap-1">
//             <span>Endereço IP da Impressora: </span>
//             <input
//               name="address"
//               className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
//             />
//           </label>
//         </div>
//         <div className="text-right">
//           <button
//             type="submit"
//             className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
//           >
//             Buscar
//           </button>
//         </div>
//       </Form>
//     </div>
//   );
// }
