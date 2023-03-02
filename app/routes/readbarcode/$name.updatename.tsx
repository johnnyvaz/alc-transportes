import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { updateName } from "~/models/settings.server";
import { requireUserId } from "~/session.server";


export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const updates = Object.fromEntries(await request.formData());
  invariant(params.name, "sem nome configurado");
  const upname = updates.name
  await updateName(userId, upname);
  console.log(" result -> " + JSON.stringify(upname))
  return json(updates);
};
