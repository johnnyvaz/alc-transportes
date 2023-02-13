import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createConfigPrinter } from "../../models/settings.server";
import { requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const name = formData.get("name");
  const address = formData.get("address");

  if (typeof name !== "string" || name.length === 0) {
    return json({ errors: { name: "Name printer is required" } }, { status: 400 });
  }

  if (typeof address !== "string" || address.length === 0) {
    return json({ errors: { address: "printer address is required" } }, { status: 400 });
  }

  const setting = await createConfigPrinter({ name, address, userId });
  return redirect(`/settings/${setting.id}`);
};

export default function NewSettings() {
  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Nome da Impressora: </span>
          <input
            name="name"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Endereço da Impressora: </span>
          <input
            name="address"
            className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
          ></input>
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Salvar
        </button>
      </div>
    </Form>
  );
}
