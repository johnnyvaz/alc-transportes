import { json } from "@remix-run/node";
import React from "react";
import { useLoaderData } from "@remix-run/react";
import { getPrinter } from "~/services/api";

export const loader = async () => {
	const host = "http://192.168.1.2";
	const result = json(
		await getPrinter(host)
	)
	console.log("result 2" + {result})
	return result;
}

export default function GetPrinter() {
	const data = useLoaderData<typeof loader>();
	return (
		<div className="relative w-full lg:max-w-sm">
			<select className="w-full p-2.5 text-gray-500 bg-white border rounded-md
			shadow-sm outline-none appearance-none focus:border-indigo-600">
				<option>Vazio</option>
				{data.map((printer:any) => (
					<option key={printer}>{printer}</option>
				))}
			</select>
		</div>

	);
}

export function ErrorBoundary({ error }: { error: Error }) {
	console.error(error);
	return <div>Opa, deu ruim. </div>;
}