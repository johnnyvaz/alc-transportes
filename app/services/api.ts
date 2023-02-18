import invariant from "tiny-invariant";

export type ResultPrinters = {
  printers: []
}

const headers = {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.PpZp5F3LEyPgjZRDOkDWaxDTBmHXijCqt-Sd-vcVo3s",
  Accept: "application/json",
  "Content-Type": "application/json",
};
export async function getPrinter(host?: string) {
  invariant(host, "Selecione um host válido");
  const { printer, error } = await fetch(`http://${host}:5010/api/printers`,
    { method: "get", headers: headers }
  ).then((res) => res.json()
  );
  console.log(JSON.stringify(printer));
  if (!error) {
    return printer;
  }
  return null;
}

export async function postPrinter(host?: string, name?: string, body?: string) {
  const postbody = {
    printerIdentifier: name,
    zpl: body
  }
  const response = await fetch(`http://${host}:5010/api/printer/zpl/`,
    {
      method: "post",
      body: JSON.stringify(postbody),
      headers: headers
    }
    ).then((res) => res.json());
  // if (!error) {
  console.log("response " + JSON.stringify(response));
    return response;
  // }
  // return null;
}