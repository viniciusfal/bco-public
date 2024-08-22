import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { Download } from 'lucide-react'

interface HeaderProps {
  setRows: (array: []) => void
  rows: any[]
}
export function Header({ setRows, rows }: HeaderProps) {
  function clearLocalStorage() {
    localStorage.removeItem('rows')
    // Atualize o estado para refletir a limpeza dos dados
    setRows([])
  }

  function exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })
    const file = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    saveAs(file, 'tabela.xlsx')
  }
  return (
    <header className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">BCO</h2>
      </div>

      <div className="flex gap-2">
        <div className="">
          <button
            onClick={exportToExcel}
            className="text-sm border rounded-md p-2 bg-slate-800 hover:bg-slate-700 transition-colors flex gap-1 items-center"
          >
            <Download className="size-4" />
            Salvar em Excel
          </button>
        </div>
        <button
          className="text-sm border rounded-md p-2 hover:bg-red-600 transition-colors "
          onClick={clearLocalStorage}
        >
          Começar do Zero
        </button>
      </div>
    </header>
  )
}
