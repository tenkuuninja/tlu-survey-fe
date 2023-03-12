import { 
  IconButton, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  FormLabel,
  TextField, } from '@mui/material'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import EditDialog from './EditDialog'
import ListStudentDialog from './ListStudentDialog'

const fakesgv = [...new Array(10)].map((item, i) => ({
  id: i + 1,
  classname: 'long1',
  startday:'1/1/2023',
  endday:'1/3/2023',
  lecturename: 'teacher',
  department:'CNTT',
  subject:'AI',
}))

const ClassDashboardPage = () => {

  const [classes, setClasses] = useState<any[]>([])
  const [classToUpdate, setClassToUpdate] = useState<any>(null)
  const [listStudent, setListStudent] = useState<any>(null)
  const [classDeleteID, setClassDeleteID] = useState<any>(null)
  const [isOpenConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false)
  const [search,setSearch] = useState()
  const handleFetchClass = () => {
    setClasses(fakesgv)
  }

  useEffect(() => {
    handleFetchClass()
  }, [])
  
  const handleClose = () =>{
    setOpenConfirmDeleteModal(false);
  }

  const handleClickDelete = (id) =>{
    setClassDeleteID(id);
    setOpenConfirmDeleteModal(true);
  };

  const handleDeleteClass = () => {
    setClasses((pre) => {
      const newArray = [...pre];
      return newArray.filter((classes)=> classes.id!==classDeleteID );
    });
    setOpenConfirmDeleteModal(false);
  }

  const columns = [
    {
      name: '#',
      selector: (row) => row.id,
    },
    {
      name: 'Tên lớp',
      selector: (row) => row.classname,
    },
    {
      name:'Ngày bắt đầu',
      selector: (row) =>row.startday,
    },
    {
      name: 'Ngày kết thúc',
      selector: (row) => row.endday,
    },
    {
      name: 'Giảng viên',
      selector: (row) => row.lecturename,
    },
    {
      name: 'Tên môn',
      selector: (row) => row.subject,
    },
    {
      name: 'Tên khoa',
      selector: (row) => row.department,
    },
    {
      name: 'Hành động',
      selector: (row) => (
        <>
          <IconButton
          size='small'
          color='success'
          onClick={()=> setListStudent(row)}
          >
          <AiOutlineEye/>
          </IconButton>
          <IconButton
            size="small"
            color="info"
            onClick={() => setClassToUpdate(row)}
          >
          <AiOutlineEdit/>
          </IconButton>
          <IconButton
          size="small"
          color="error"
          onClick={() => handleClickDelete(row.id)}
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
        <h2 className="text-2xl font-semibold">Lớp học</h2>
        <div> 
        <FormControl fullWidth>
                  <FormLabel>Tên lớp</FormLabel>
                  <TextField
                    size="small"           
                    placeholder="Tìm kiếm..."
                    fullWidth
                  />
                </FormControl>

        </div>   
        <Button onClick={() => setClassToUpdate({})}>
          <AiOutlinePlus /> Thêm
        </Button>
      </div>
      <div>
        <DataTable data={classes} columns={columns} />
      </div>
      <ListStudentDialog
        open={!!listStudent}
        onclose={() => setListStudent(null)}
        data ={listStudent}
        onSuccess={handleFetchClass}
      />
      <EditDialog
        open={!!classToUpdate}
        onClose={() => setClassToUpdate(null)}
        data={classToUpdate}
        onSuccess={handleFetchClass}
      />
      <Dialog open={isOpenConfirmDeleteModal} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Xác nhận xóa lớp học</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn có chắc muốn xóa lớp học này không??
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteClass}
          startIcon={<AiOutlineDelete />}
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default ClassDashboardPage
