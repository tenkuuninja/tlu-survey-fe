import { IconButton, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import EditDialog from './EditDialog'

const fakes = [...new Array(10)].map((item, i) => ({
  id: i + 1,
  title: 'Khảo sát về dịch bệnh covid',
  numberOfQuestions: 4,
}))

const SurveyDashboardPage = () => {
  const [surveys, setSurveys] = useState<any[]>([])
  const [itemToUpdate, setItemToUpdate] = useState<any>(null)
  const [itemToDelete, setItemToDelete] = useState<any>(null)

  const handleFetchItem = () => {
    setSurveys(fakes)
  }

  useEffect(() => {
    handleFetchItem()
  }, [])

  const columns = [
    {
      name: '#',
      selector: (row) => row.id,
    },
    {
      name: 'Tiêu đề',
      selector: (row) => row.title,
    },
    {
      name: 'Số câu hỏi',
      selector: (row) => row.numberOfQuestions,
    },
    {
      name: 'Hành động',
      selector: (row) => (
        <>
          <IconButton
            size="small"
            color="info"
            onClick={() => setItemToUpdate(row)}
          >
            <AiOutlineEdit />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => setItemToDelete(row)}
          >
            <AiOutlineDelete />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <div className="min-h-[600px] rounded-md border border-neutral-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Biểu mẫu khảo sát</h2>
        <Button onClick={() => setItemToUpdate({})}>
          <AiOutlinePlus /> Thêm
        </Button>
      </div>
      <div>
        <DataTable data={surveys} columns={columns} />
      </div>
      <EditDialog
        open={!!itemToUpdate}
        onClose={() => setItemToUpdate(null)}
        data={itemToUpdate}
        onSuccess={handleFetchItem}
      />
    </div>
  )
}

export default SurveyDashboardPage
