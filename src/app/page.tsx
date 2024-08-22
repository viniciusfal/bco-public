'use client'

import { Header } from '@/components/Header'
import { InputField } from '@/components/InputField'
import { Modal } from '@/components/Modal'
import { Select } from '@/components/Select'
import { plate } from '@/services/plates'

import { Calculator, CirclePlus } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem('rows')
    return savedRows
      ? JSON.parse(savedRows)
      : [
          {
            id: '1',
            empresa: 'Amazonia Inter',
            cnpj: '12.647.487/0001-88',
            nomeLinha: '',
            prefixo: '',
            codigoLinha: '',
            sentido: 'GO - DF',
            localOrigem: '',
            localDestino: '',
            dia: '',
            horario: '00:00',
            placa: plate()[0],
            pagantes: 0,
            idoso: 0,
          },
        ]
  })

  useEffect(() => {
    // Salva linhas no localStorage sempre que rows mudar
    localStorage.setItem('rows', JSON.stringify(rows))
  }, [rows])

  function openModal(index: number) {
    setSelectedIndex(index)
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
    setSelectedIndex(null)
  }
  function addRow() {
    setRows([
      ...rows,
      {
        id: (rows.length + 1).toString(),
        empresa: 'Amazonia Inter',
        cnpj: '12.647.487/0001-88',
        nomeLinha: '',
        prefixo: '',
        codigoLinha: '',
        sentido: '',
        localOrigem: '',
        localDestino: '',
        dia: '',
        horario: '00:00',
        placa: plate()[0],
        pagantes: 0,
        idoso: 0,
      },
    ])
  }

  function handleRowChange(index: number, field: string, value: any) {
    const updatedRows = [...rows]
    updatedRows[index] = { ...updatedRows[index], [field]: value }
    setRows(updatedRows)
  }

  function handlePagantesChange(index: number, value: number) {
    const updatedRows = [...rows]
    updatedRows[index] = { ...updatedRows[index], pagantes: value }
    setRows(updatedRows)
  }

  function handleSaveRoleta(initial: number, final: number) {
    if (selectedIndex !== null) {
      const updatedRows = [...rows]
      const pagantes = final - initial
      updatedRows[selectedIndex] = { ...updatedRows[selectedIndex], pagantes }
      setRows(updatedRows)
      closeModal()
    }
  }

  return (
    <div className="px-6 py-4">
      <Header setRows={setRows} rows={rows} />

      <main className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400">
            <tr>
              <th className="px-2 py-3">Empresa</th>
              <th className="w-[180px] px-2 py-3">CNPJ</th>
              <th className="w-[420px] px-2 py-3">Nome da Linha</th>
              <th className="w-[120px] px-2 py-3">Prefixo</th>
              <th className="w-[120px] px-2 py-3">Código (Linha)</th>
              <th className="w-[140px] px-2 py-3">Sentido</th>
              <th className="w-[200px] px-2 py-3">Local de origem</th>
              <th className="w-[180px] px-2 py-3">Local de destino</th>
              <th className="w-[100px] px-2 py-3">Dia</th>
              <th className="w-[100px] px-2 py-3">Horário</th>
              <th className="w-[180px] px-2 py-3">Placa</th>
              <th className="w-[80px] px-2 py-3">Pagantes</th>
              <th className="w-[80px] px-2 py-3">Idoso</th>
              <th className="px-2 py-3"></th>
              <th className="px-2 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row: any, index: number) => (
              <tr
                key={index}
                className="even:bg-gray-800 bg-slate-800 border-b border-gray-700 text-white"
              >
                <th className="px-2 py-4 font-medium whitespace-nowrap">
                  {row.empresa}
                </th>
                <td className="px-2 py-4">{row.cnpj}</td>
                <td className="px-1 py-4">
                  <Select
                    value={row.nomeLinha}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleRowChange(index, 'nomeLinha', e.target.value)
                    }
                  >
                    <option value="">Selecione</option>
                    <option>PLANALTINA/GO - BRASILIA/DF</option>
                    <option>PLANALTINA/GO - PLANALTINA/DF</option>
                    <option>PLANALTINA/GO - SOBRADINHO/DF</option>
                    <option>PLANALTINA/DF - FORMOSA/GO</option>
                  </Select>
                </td>
                <td className="px-2 py-4">
                  <Select
                    value={row.prefixo}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleRowChange(index, 'prefixo', e.target.value)
                    }
                  >
                    <option value="">Selecione</option>
                    <option value="1">001</option>
                    <option value="2">321</option>
                    <option value="3">000</option>
                  </Select>
                </td>
                <td className="px-2 py-4">
                  <Select
                    value={row.codigoLinha}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleRowChange(index, 'codigoLinha', e.target.value)
                    }
                  >
                    <option value="">Selecione</option>
                    <option>1004</option>
                    <option>1054</option>
                    <option>1108</option>
                    <option>1301</option>
                  </Select>
                </td>
                <td className="px-2 py-4">
                  <Select
                    value={row.sentido}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleRowChange(index, 'sentido', e.target.value)
                    }
                  >
                    <option value="">Selecione</option>
                    <option>DF - GO</option>
                    <option>GO - DF</option>
                  </Select>
                </td>

                <td className="px-2 py-4">
                  <Select
                    value={row.localOrigem}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleRowChange(index, 'localOrigem', e.target.value)
                    }
                  >
                    <option value="">Selecione</option>
                    <option>Planaltina-DF</option>
                    <option>Brasilia</option>
                    <option>Formosa</option>
                    <option>Sobradinho</option>
                  </Select>
                </td>

                <td className="px-2 py-4">
                  <Select
                    value={row.localDestino}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleRowChange(index, 'localDestino', e.target.value)
                    }
                  >
                    <option value="">Selecione</option>
                    <option>Planaltina-DF</option>
                    <option>Brasilia</option>
                    <option>Formosa</option>
                    <option>Sobradinho</option>
                  </Select>
                </td>

                <td className="px-2 py-4">
                  <InputField
                    type="date"
                    value={row.dia}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleRowChange(index, 'dia', e.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-4">
                  <InputField
                    type="time"
                    value={row.horario}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleRowChange(index, 'horario', e.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-4">
                  <Select
                    value={row.placa}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleRowChange(index, 'placa', e.target.value)
                    }
                  >
                    {plate().map((p, idx) => (
                      <option key={idx} value={p}>
                        {p}
                      </option>
                    ))}
                  </Select>
                </td>
                <td className="px-2 py-4">
                  <InputField
                    type="number"
                    value={row.pagantes}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handlePagantesChange(index, Number(e.target.value))
                    }
                  />
                </td>
                <td className="px-2 py-4">
                  <InputField
                    type="number"
                    value={row.idoso}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleRowChange(index, 'idoso', Number(e.target.value))
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={() => openModal(index)}
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    <Calculator />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      const newRows = rows.filter(
                        (_: any, i: number) => i !== index,
                      )
                      setRows(newRows)
                    }}
                    className="text-red-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2.5 me-2"
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {open && selectedIndex !== null && (
        <Modal
          open={open}
          onClose={closeModal}
          title="Calcular Passageiros"
          onSave={(initial, final) => handleSaveRoleta(initial, final)}
        />
      )}

      <button
        onClick={addRow}
        className="w-full text-gray-900 focus:outline-none hover:bg-gray-100 font-medium rounded-sm text-sm px-5 py-2.5 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 focus:ring-0 transition-colors"
      >
        <CirclePlus className="mx-auto" />
      </button>
    </div>
  )
}
