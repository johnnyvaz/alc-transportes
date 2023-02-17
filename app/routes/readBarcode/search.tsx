

export default function SearchRoute() {

  return (
    <main>
      <div className="bg-gray-800 p-8 rounded-lg ">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-center text-white py-2 rounded-t-lg mb-4">
          <h1 className="text-2xl font-medium">Leitura de Código de Barras</h1>
        </div>
        <form
          // onSubmit={"handleSubmit"}
        >
          <label htmlFor="codigoBarras" className="block text-white font-medium mb-2">
            Código de Barras:
          </label>
          <input
            type="text"
            id="codigoBarras"
            name="codigoBarras"
            value={""}
            onChange={"handleCodigoBarrasChange"}
            className="bg-gray-700 text-black bg-white rounded border border-gray-600 py-2 px-3 mb-4 w-full"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
            Enviar
          </button>
        </form>
        <br/>
      </div>
    </main>
  )
}