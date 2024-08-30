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

    // Adiciona uma linha com o título "Demandas Domês"
    worksheet.addRow([])
    worksheet.mergeCells('A1:O1') // Mescla as células da coluna A até a O para o título
    worksheet.getCell('A1').alignment = {
      horizontal: 'center',
      vertical: 'middle',
    }

    worksheet.columns = [
      { header: 'Empresa', key: 'empresa', width: 15 },
      { header: 'CNPJ', key: 'cnpj', width: 18 },
      { header: 'Nome da Linha', key: 'nomeLinha', width: 33 },
      { header: 'Prefixo', key: 'prefixo', width: 11 },
      { header: 'Código', key: 'codigoLinha', width: 8 },
      { header: 'Sentido', key: 'sentido', width: 10 },
      { header: 'Local de origem', key: 'localOrigem', width: 32 },
      { header: 'Local de destino', key: 'localDestino', width: 32 },
      { header: 'Dia', key: 'dia', width: 12 },
      { header: 'Horário', key: 'horario', width: 9 },
      { header: 'Placa', key: 'placa', width: 12 },
      { header: 'Pagantes', key: 'pagantes', width: 10 },
      { header: 'Idosos', key: 'idoso', width: 8 },
      { header: 'Passe Livre', key: 'passeLivre', width: 10 },
      { header: 'Jovem de Baixa Renda', key: 'jovem', width: 10 },
    ]

    worksheet.getCell('A1').value = 'DADOS DE DEMANDA REFERENTE AO MÊS DE '
    worksheet.addRow([
      'Empresa',
      'CNPJ',
      'Nome da Linha',
      'Prefixo',
      'Código',
      'Sentido',
      'Local de origem',
      'Local de destino',
      'Dia',
      'Horário',
      'Placa',
      'Pagantes',
      'Idosos',
      'Passe Livre',
      'Jovem de Baixa renda',
    ])

    rows.forEach((row) => {
      // Calcula pagantes antes de adicionar a linha
      const pagantes = Math.max(
        0,
        (row.pagantes || 0) - (row.idoso || 0) - (row.passeLivre || 0),
      )
      const updateRow = { ...row, jovem: 0, pagantes }
      worksheet.addRow(updateRow)
    })

    worksheet.getRow(1).font = {
      bold: true,
      color: { argb: 'ffffff' },
      size: 14,
    }
    worksheet.getRow(2).font = {
      bold: true,
      color: { argb: 'ffffff' },
      size: 12,
    }

    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '6b7280' },
    }

    worksheet.getRow(2).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '6b7280' },
    }

    worksheet.eachRow((row) => {
      row.height = 20
    })

    worksheet.getRow(1).height = 30
    worksheet.getRow(2).height = 60

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

    worksheet.getRow(1).alignment = {
      horizontal: 'center',
      vertical: 'middle',
    }

    worksheet.getRow(2).alignment = {
      horizontal: 'left',
      vertical: 'middle',
      wrapText: true,
    }

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
            className="font-medium text-sm border rounded-md p-2 bg-teal-50  hover:bg-zinc-50 transition-colors flex gap-1 items-center text-[#f55911dc]"
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
