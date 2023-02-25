// import type { ActionFunction, LoaderArgs } from "@remix-run/node";
// import { json, redirect } from "@remix-run/node";
// import { Form, useLoaderData } from "@remix-run/react";
// import { requireUserId } from "~/session.server";
// import invariant from "tiny-invariant";
// import type { Setting } from "~/models/settings.server";
// import {deleteConfigPrinter, getConfigPrinter} from "~/models/settings.server";
//
// type LoaderData = {
//   setting: Setting;
// };
//
// export async function loader({ request, params }: LoaderArgs) {
//   const userId = await requireUserId(request);
//   invariant(params.settingId, "setting not found");
//
//   const setting = await getConfigPrinter({ userId, id: params.settingId });
//   if (!setting) {
//     throw new Response("Not Found", { status: 404 });
//   }
//
//   return json({ setting });
// }
//
// export const action: ActionFunction = async ({ request, params }) => {
//   const userId = await requireUserId(request);
//   invariant(params.settingId, "ConfigPrinterId not found");
//
//   await deleteConfigPrinter({ userId, id: params.settingId });
//
//   return redirect("/settings");
// };
//
// export default function ConfigPrinterDetailsPage() {
//   const data = useLoaderData<typeof loader>() as unknown as LoaderData;
//
//   return (
//     <div>
//       <h3 className="text-2xl font-bold">{data.setting.name}</h3>
//       <p className="py-6">{data.setting.address}</p>
//       <hr className="my-4" />
//       <Form method="post">
//         <button
//           type="submit"
//           className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
//         >
//           Delete
//         </button>
//       </Form>
//     </div>
//   );
// }
