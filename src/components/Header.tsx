import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { CircleGauge, Download } from 'lucide-react'
import { useEffect, useState } from 'react'

interface HeaderProps {
  setRows: (array: any[]) => void
  rows: any[]
}

export function Header({ setRows, rows }: HeaderProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  function clearLocalStorage() {
    if (isClient) {
      localStorage.removeItem('rows')
      setRows([])
    }
  }

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet1')

    // Define columns based on the table
    worksheet.columns = [
      { header: 'Empresa', key: 'empresa', width: 20 },
      { header: 'CNPJ', key: 'cnpj', width: 20 },
      { header: 'Nome da Linha', key: 'nomeLinha', width: 40 },
      { header: 'Prefixo', key: 'prefixo', width: 10 },
      { header: 'Código', key: 'codigoLinha', width: 10 },
      { header: 'Sentido', key: 'sentido', width: 10 },
      { header: 'Local de origem', key: 'localOrigem', width: 15 },
      { header: 'Local de destino', key: 'localDestino', width: 15 },
      { header: 'Dia', key: 'dia', width: 15 },
      { header: 'Horário', key: 'horario', width: 10 },
      { header: 'Placa', key: 'placa', width: 15 },
      { header: 'Pagantes', key: 'pagantes', width: 10 },
      { header: 'Idosos', key: 'idoso', width: 10 },
      { header: 'Passe Livre', width: 8 },
      { header: 'Jovem de Baixa renda', width: 8 },
    ]

    // Add rows to the worksheet
    rows.forEach((row) => worksheet.addRow(row))

    // Apply styles
    worksheet.getRow(1).font = { bold: true, color: { argb: 'ffffff' } }

    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '6b7280' },
    }

    worksheet.eachRow((row) => {
      row.height = 20
    })
    worksheet.getRow(1).height = 30

    worksheet.eachRow((row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = { horizontal: 'left', vertical: 'middle' }
        cell.border = {
          top: { style: 'thin', color: { argb: 'a1a1aa' } },
          left: { style: 'thin', color: { argb: 'a1a1aa' } },
          bottom: { style: 'thin', color: { argb: 'a1a1aa' } },
          right: { style: 'thin', color: { argb: 'a1a1aa' } },
        }
      })
    })

    // Save the file
    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        const blob = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        saveAs(blob, 'tabela_customizada.xlsx')
      })
      .catch((error) => {
        console.error('Error exporting to Excel:', error)
      })
  }

  return (
    <header className="flex items-center justify-between">
      <div className="text-[#f0eee9] flex items-center gap-0.5 ">
        <h2 className="text-2xl font-bold">B</h2>
        <h2 className="text-2xl font-bold">C</h2>
        <CircleGauge className="animate-bounce size-6 leading-8 " />
      </div>

      <div className="flex gap-2">
        <div className="">
          <button
            onClick={exportToExcel}
            className="font-medium text-sm border rounded-md p-2 bg-[#f0eee9]  hover:bg-zinc-50 transition-colors flex gap-1 items-center text-[#f55911]"
          >
            <Download className="size-4" />
            Salvar em Excel
          </button>
        </div>
        <button
          className="font-medium text-sm border rounded-md p-2 hover:bg-red-500 transition-colors text-zinc-100"
          onClick={clearLocalStorage}
        >
          Começar do Zero
        </button>
      </div>
    </header>
  )
}
