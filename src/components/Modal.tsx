import { useState } from 'react'
import { InputField } from './InputField'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  onSave: (initial: number, final: number) => void
}

export function Modal({ open, onClose, title, onSave }: ModalProps) {
  const [initialValue, setInitialValue] = useState<number>(0)
  const [finalValue, setFinalValue] = useState<number>(0)

  if (!open) return null

  return (
    <div className="inset-0 fixed text-white  flex items-center justify-end pr-2">
      <div className="p-4 rounded shadow-lg bg-teal-700] ">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Roleta Inicial
          </label>
          <InputField
            type="text"
            value={initialValue}
            onChange={(e: any) => setInitialValue(Number(e.target.value))}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Roleta Final</label>
          <InputField
            type="text"
            value={finalValue}
            onChange={(e: any) => setFinalValue(Number(e.target.value))}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <button
            onClick={() => onSave(initialValue, finalValue)}
            className="bg-[#f55911] hover:bg-[#f55911dc] text-white px-4 py-2 rounded"
          >
            Salvar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
