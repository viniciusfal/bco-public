'use client'

import { Header } from '@/components/Header'
import { InputField } from '@/components/InputField'
import { Modal } from '@/components/Modal'
import { Select } from '@/components/Select'
import { lines } from '@/services/lines'
import { plate } from '@/services/plates'

import { Calculator, CirclePlus } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [rows, setRows] = useState<any[]>([])

  useEffect(() => {
    const savedRows = localStorage.getItem('rows')
    if (savedRows) {
      setRows(JSON.parse(savedRows))
    } else {
      setRows([
        {
          id: '1',
          empresa: 'Amazonia Inter',
          cnpj: '12.647.487/0001-88',
          nomeLinha: '',
          prefixo: '',
          codigoLinha: lines()[0],
          sentido: 'GO - DF',
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
  }, [])

  useEffect(() => {
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
        codigoLinha: lines()[0],
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

    // Update prefixo based on nomeLinha
    if (field === 'nomeLinha') {
      updatedRows[index].prefixo = getPrefix(value)
    }

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

  function getPrefix(nomeLinha: string) {
    switch (nomeLinha) {
      case 'PLANALTINA/GO - PLANALTINA/DF':
        return '12-1070-70'
      case 'PLANALTINA/DF - FORMOSA/GO':
        return '12-0338-70'
      default:
        return '12-0730-70'
    }
  }

  return (
    <div className="px-6 py-4">
      <Header setRows={setRows} rows={rows} />

      <main className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs font-bold text-[#22331d] uppercase bg-[#f0eee9] ">
            <tr>
              <th className="px-1 py-3">Empresa</th>
              <th className="w-[160px] px-2 py-3">CNPJ</th>
              <th className="w-[450px] px-2 py-3">Nome da Linha</th>
              <th className="w-[180px] px-2 py-3">Prefixo</th>
              <th className="w-[120px] px-2 py-3">Código (Linha)</th>
              <th className="w-[140px] px-2 py-3">Sentido</th>
              <th className="w-[200px] px-2 py-3">Local de origem</th>
              <th className="w-[200px] px-2 py-3">Local de destino</th>
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
                className=" bg-[#fff] even:bg-[#f5f5f5]  border-gray-700 text-zinc-950"
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
                    <option>-</option>
                    <option>PLANALTINA/GO - BRASILIA/DF</option>
                    <option>PLANALTINA/GO - PLANALTINA/DF</option>
                    <option>PLANALTINA/GO - SOBRADINHO/DF</option>
                    <option>PLANALTINA/DF - FORMOSA/GO</option>
                  </Select>
                </td>
                <td className="px-2 py-4">
                  <InputField
                    value={row.prefixo}
                    onChange={() => {}}
                    // Disabled because prefixo is now managed by nomeLinha
                  />
                </td>
                <td className="px-2 py-4">
                  <Select
                    value={row.codigoLinha}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleRowChange(index, 'codigoLinha', e.target.value)
                    }
                  >
                    {lines().map((l, idx) => (
                      <option key={idx} value={l}>
                        {l}
                      </option>
                    ))}
                  </Select>
                </td>
                <td className="px-2 py-4">
                  <Select
                    value={row.sentido}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleRowChange(index, 'sentido', e.target.value)
                    }
                  >
                    <option>-</option>
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
                    <option value="">-</option>
                    <option>Planaltina-GO</option>
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
                    <option value="">-</option>
                    <option>Planaltina-GO</option>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleRowChange(index, 'dia', e.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-4">
                  <InputField
                    type="time"
                    value={row.horario}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                    min={0}
                    value={row.pagantes - row.idoso}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handlePagantesChange(index, Number(e.target.value))
                    }
                  />
                </td>
                <td className="px-2 py-4">
                  <InputField
                    type="number"
                    min={0}
                    value={row.idoso}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleRowChange(index, 'idoso', Number(e.target.value))
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={() => openModal(index)}
                    className="focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2.5 me-2 bg-[#22331d] text-zinc-100"
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
                    className="text-red-500 focus:outline-none hover:bg-red-500 hover:text-zinc-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2.5 me-2"
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
        className="w-full focus:outline-none font-medium rounded-sm text-sm px-5 py-2.5 text-[#f5f5f5] hover:bg-zinc-300 hover:text-[#22331d] border-[#f5f5f5] focus:ring-0 transition-colors"
      >
        <CirclePlus className="mx-auto" />
      </button>
    </div>
  )
}
