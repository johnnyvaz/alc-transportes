import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { updateConfigPrinter } from "~/models/settings.server";
import { requireUserId } from "~/session.server";


export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const updates = Object.fromEntries(await request.formData());
  invariant(params.address, "sem ip configurado");
  const upaddress = updates.address
  await updateConfigPrinter(userId, upaddress);
  console.log(" result -> " + JSON.stringify(updates.address))
  return json(updates);
};
