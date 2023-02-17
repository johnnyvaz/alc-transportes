import invariant from "tiny-invariant";

export type ResultPrinters = {
  printers: []
}

const headers = {
  // Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
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
