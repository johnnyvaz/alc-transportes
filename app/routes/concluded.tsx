import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Outlet } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { setConcluded } from "~/models/route.server";
import Header from "~/component/header";


export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  await setConcluded(userId);

  return redirect("/readbarcode")
};


export default function Concluded() {

  return (
    <main>
      <div className="flex h-full min-h-screen flex-col">
        <Header />
        <div className="flex">
          <div className="w-auto flex-1">
            <div className="container p-2">
              <div className="rounded-lg bg-gray-800 p-8 ">
                <div className="mb-4 rounded-t-lg bg-gradient-to-r from-purple-500 to-blue-500 py-2 text-center text-white">
                  <h1 className="text-2xl font-medium">
                    Marcar como concluído
                  </h1>
                </div>
                <div>
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
                        <div className="text-white text-1xl text-center">Marca todos os registros como concluídos e não aparecem na tela</div>

                      </label>
                    </div>
                    <div className="text-white text-1xl text-center">Essa operação não pode ser desfeita</div>
                    <div className="text-right">
                      <button
                        type="submit"
                        className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                      >
                        Concluir
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className="w-auto flex-1"></div>
        </div>
      </div>
      <Outlet />
    </main>
  );
}

