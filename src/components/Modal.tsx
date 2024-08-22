import { useState } from 'react'

export function Modal({ close, setTotal }) {
  const [rolInitial, setRolInitial] = useState(0)
  const [rolFinal, setRolFinal] = useState(0)

  const handleSave = () => {
    const calculatedTotal = rolFinal - rolInitial
    setTotal(calculatedTotal)
    close()
  }

  return (
    <div
      id="static-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden w-full h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 max-w-2xl w-full max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3
              id="modal-title"
              className="text-xl font-semibold text-gray-900 dark:text-white"
            >
              Calcular roleta
            </h3>
          </div>

          <div className="flex gap-2 p-4">
            <input
              type="text"
              className="p-2 w-32 text-sm rounded-sm bg-transparent font-bold border border-gray-300 dark:border-gray-600"
              placeholder="Roleta Inicial"
              value={rolInitial}
              onChange={(e) => setRolInitial(Number(e.target.value))}
            />
            <input
              type="text"
              className="p-2 w-32 text-sm rounded-sm bg-transparent font-bold border border-gray-300 dark:border-gray-600"
              placeholder="Roleta final"
              value={rolFinal}
              onChange={(e) => setRolFinal(Number(e.target.value))}
            />
            <input
              type="number"
              className="p-2 w-32 text-sm rounded-sm bg-transparent font-bold border border-gray-300 dark:border-gray-600"
              placeholder="Total"
              disabled
              value={rolFinal - rolInitial}
            />
          </div>

          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="button"
              onClick={handleSave}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={close}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
