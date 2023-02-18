import { useUser } from "~/utils";
import { Form, Link } from "@remix-run/react";

export default function Header() {
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