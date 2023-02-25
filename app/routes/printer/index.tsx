import { defer } from "@remix-run/node";
import { Suspense } from "react";
import { Await, useLoaderData } from "@remix-run/react";
import type { PrinterStatus } from "~/types";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loader() {
  const host = "http://192.168.1.2";
  const name = "DeskJet-5200"
  const checkprinter: Promise<PrinterStatus> = fetch(
    `${host}:5010/api/printers/${name}`
  )
    .then((res) => delay(15000)
    .then(() => res.json()))

  return defer({
    checkprinter
  });
}
export default function Status() {
  const { checkprinter: promisePrinter } =
    useLoaderData<typeof loader>();

  return (
    <main>
    <div className="relative lg:max-w-sm">
      {/*<div  className=" p-2.5 text-gray-500 bg-white border rounded-md*/}
			{/*shadow-sm outline-none appearance-none focus:border-indigo-600">*/}
      {/*  <abbr title={data.setting.address}>Nome: {data.setting.name} </abbr>*/}
      {/*  { data.printerOnline ? <div>ONLINE</div> : <div>OFFLINE</div>}*/}
      {/*</div>*/}
      <Suspense fallback={<p>Buscando Impressora</p>}>
        <Await resolve={promisePrinter}>
          {(checkprinter) => (
            <ul>
              {checkprinter.message}
            </ul>
          )}
        </Await>
      </Suspense>
    </div>
    </main>
  )
}