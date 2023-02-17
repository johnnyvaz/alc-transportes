import { Form, Link } from "@remix-run/react";
import { useUser } from "~/utils";
import SearchRoute from "~/routes/readBarcode/search";
import TableToPrint from "~/routes/readBarcode/tabletoprint";
import TablePrinted from "~/routes/readBarcode/tableprinted";
import { getRouteListItems, getRoutePrintedListItems } from "~/models/route.barcode.server";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";


export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const routeListItems = await getRouteListItems({ userId });
  const routePrintedListItems = await getRoutePrintedListItems({ userId });
  return json({ routeListItems, routePrintedListItems });
}
export default function Formulario() {

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />

      <div className="flex">
        <div className="flex-1 w-auto">
          <div className="container p-2">
            <SearchRoute />
          </div>
        </div>
        <div className="flex-1 w-auto">
          <TableToPrint />
          <TablePrinted />
        </div>
      </div>
    </div>
  );
}


function Header() {
  const user = useUser();
  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
      <div className="text-2xl ">
        <Link to="/settings">Config. Impressora</Link>
      </div>
      <p>usuário logado: {user.email}</p>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Sair
        </button>
      </Form>
    </header>
  );
}
