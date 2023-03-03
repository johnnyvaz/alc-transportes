// import { Form } from "@remix-run/react";
// import { ActionFunction, json } from "@remix-run/node";
// import { requireUserId } from "~/session.server";
//
// export const action: ActionFunction = async ({ request }) => {
//   const userId = await requireUserId(request);
//
//   const formData = await request.formData();
//   const body = formData.get("body");
//
//   if (typeof body !== "string" || body.length === 0) {
//     return json({ errors: { body: "Body is required" } }, { status: 400 });
//   }
//   const lines = body.split('\n')
//   lines.forEach(line => {
//     const columns = line.split(';');
//     const dataRoute = {
//       orderid: columns[0],
//       route: columns[1],
//       stop: columns[2]
//     }
//     console.log("dataroutes :" + dataRoute)
//     // const routes = await createRoute({ title, body, userId });
//   })
//
//   return json({lines: lines})
//   // return redirect(`/notes/${note.id}`);
// };
//
//
// export default function ImportRoute() {
//
//   return (
//     <main>
//       <div className="container p-2">
//         <div className="bg-gray-800 text-white text-center justify-center resize p-4 rounded-t-lg
//           uppercase">
//           Importar Dados
//         </div>
//         <div className="border border-gray-400">
//
//         </div>
//         <Form
//           method="post"
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 8,
//             width: "100%",
//           }}
//         >
//           <div>
//             <label className="flex w-full flex-col gap-1">
//               <span>pedido;rota;parada</span>
//               <textarea
//                 name="body"
//                 rows={8}
//                 className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
//               ></textarea>
//             </label>
//           </div>
//
//           <div className="text-right">
//             <button
//               type="submit"
//               className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
//             >
//               Salvar
//             </button>
//           </div>
//         </Form>
//       </div>
//     </main>
//   );
// }