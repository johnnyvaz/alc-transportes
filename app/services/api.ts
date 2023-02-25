import invariant from "tiny-invariant";
import type { Route } from "~/models/route.barcode.server";

export type ResultPrinters = {
  printers: []
}

const headers = {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.PpZp5F3LEyPgjZRDOkDWaxDTBmHXijCqt-Sd-vcVo3s",
  Accept: "application/json",
  "ngrok-skip-browser-warning": "cod2d",
  "Content-Type": "application/json",
};
export async function getPrinter(host?: string) {
  invariant(host, "Selecione um host válido");
  const { printer, error } = await fetch(`https://${host}:5010/api/printers`,
    { method: "get", headers: headers }
  ).then((res) => res.json()
  );
  console.log(JSON.stringify(printer));
  if (!error) {
    return printer;
  }
  return null;
}

export async function postPrinter(host?: string | undefined, name?: string | undefined, route?: Route | null) {

  const postApiPrinter = {
    tagContent: {
      route: route?.route,
      stop: route?.stop,
      orderid: route?.orderid
    },
    printerIdentifier: name
  }
  const { response, error } = await fetch(`https://${host}:5010/api/printer/routes/`,
    {
      method: "post",
      body: JSON.stringify(postApiPrinter),
      headers: headers
    }
    ).then((res) => res.json());
  if (!error) {
  console.log("response postPrinter" + JSON.stringify(response));
    return response;
  }
  return null;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getPrinterSelected(host?: string, name?: string) {
  invariant(host, "Selecione um host válido");
  const printResponse = await fetch(`${host}:5010/api/printers/${name}`,
    { method: "get", headers: headers }
  ).then((res) => { delay(15000);
    if (res.ok) {
      console.log("printResponse" + printResponse)
      return true
    } else {
      console.log('Network response was not ok.');
      return false
    }
  }).catch(function(error) {
      console.log('Erro com o fetch operation: ' + error.message);
      return false
    });
}