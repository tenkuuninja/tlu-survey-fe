import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip,
  Skeleton,
} from '@mui/material'
import ClassApi from 'common/apis/class'
import useAuth from 'common/hooks/useAuth'
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import DataTable, { TableColumn } from 'react-data-table-component'
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai'
import DeleteStudentDialog from './DeleteStudentDialog'
import AddStudentDialog from './AddStudentDialog'

const ListStudentDialog = ({ open, onclose, data, onSuccess }) => {
  const { role } = useAuth()
  const [isLoading, setLoading] = useState(false)
  const [listStudents, setlistStudents] = useState<any[]>([])
  const [itemToDelete, setItemToDelete] = useState<any>(null)
  const [itemToUpdate, setItemToUpdate] = useState<any>(null)

  const handleFetchListStudent = async () => {
    setLoading(true)
    const res = await ClassApi.getListStudent(1)
    setlistStudents(res.data)
    setLoading(false)
  }

  useEffect(() => {
    handleFetchListStudent()
  }, [])

  const columns: TableColumn<any>[] = [
    {
      name: 'Mã sinh viên',
      selector: (row) => row.id,
    },
    {
      name: 'Tên',
      selector: (row) => row.name,
    },
    {
      name: 'Giới tính',
      selector: (row) => row.sex,
    },
    {
      name: 'Khoa',
      selector: (row) => row.department?.code,
    },
    {
      name: 'Hành động',
      selector: (row) => (
        <>
          <Tooltip arrow title="Xoá" placement="top">
            <IconButton
              size="small"
              color="error"
              onClick={() =>
                setItemToDelete({ class_id: data.id, student_id: row.id })
              }
            >
              <AiOutlineDelete />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ]

  return (
    <Dialog open={open} onClose={onclose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Danh sách sinh viên</h2>
          {role === 'admin' && (
            <Button onClick={() => setItemToUpdate({ class_id: data.id })}>
              <AiOutlinePlus /> Thêm
            </Button>
          )}
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="mt-10">
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
          {!isLoading && <DataTable data={listStudents} columns={columns} />}
        </div>
      </DialogContent>

      <AddStudentDialog
        open={!!itemToUpdate}
        onClose={() => setItemToUpdate(null)}
        data={itemToUpdate}
        onSuccess={handleFetchListStudent}
      />

      <DeleteStudentDialog
        open={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        data={itemToDelete}
        onSuccess={handleFetchListStudent}
      />
    </Dialog>
  )
}
export default ListStudentDialog
