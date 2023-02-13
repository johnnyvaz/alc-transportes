import { Link } from "@remix-run/react";

export default function SettingsIndexPage() {
  return (
    <p>
      Sem impressora selecionada, ou {" "}
      <Link to="new" className="text-blue-500 underline">
        adicione uma nova configuração.
      </Link>
    </p>
  );
}
