import { Button, IconButton, Skeleton } from '@mui/material'
import SurveyApi from 'common/apis/survey'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlinePlus,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import DeleteDialog from './DeleteDialog'
import EditDialog from './EditDialog'

const SurveyDashboardPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [surveys, setSurveys] = useState<any[]>([])
  const [itemToUpdate, setItemToUpdate] = useState<any>(null)
  const [itemToDelete, setItemToDelete] = useState<any>(null)

  const handleFetchItem = async () => {
    setLoading(true)
    const res = await SurveyApi.getAll()
    setSurveys(res.data)
    setLoading(false)
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
      name: 'Mã',
      selector: (row) => row.code,
    },
    {
      name: 'Tiêu đề',
      selector: (row) => row.title,
    },
    {
      name: 'Số câu hỏi',
      selector: (row) => row.questions?.length || 0,
    },
    {
      name: 'Hành động',
      selector: (row) => (
        <>
          <Link to={`/survey/${row?.id}`} target="_blank">
            <IconButton size="small" color="info">
              <AiOutlineEye />
            </IconButton>
          </Link>
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
        {isLoading && (
          <>
            {[...new Array(10)].map((item, i) => (
              <Skeleton
                variant="rectangular"
                height={32}
                sx={{ mt: 2 }}
                key={i}
              />
            ))}
          </>
        )}
        {!isLoading && <DataTable data={surveys} columns={columns} />}
      </div>
      <EditDialog
        open={!!itemToUpdate}
        onClose={() => setItemToUpdate(null)}
        data={itemToUpdate}
        onSuccess={handleFetchItem}
      />
      <DeleteDialog
        open={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        data={itemToDelete}
        onSuccess={handleFetchItem}
      />
    </div>
  )
}

export default SurveyDashboardPage
