import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Switch,
  TextField,
} from '@mui/material'
import ClassApi from 'common/apis/class'
import StudentApi from 'common/apis/student'
import SurveyApi from 'common/apis/survey'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'

const options = [
  {
    field: 'limit',
    title: 'Giới hạn',
    description: 'Mỗi sinh viên/giảng viên chỉ được thực hiện khảo sát 1 lần',
  },
  {
    field: 'process_bar',
    title: 'Thanh tiến trình',
    description: 'Sẽ hiển thị thanh tiến trình khi thực hiện khảo sát',
  },
  {
    field: 'shuffle_question_order',
    title: 'Xáo trộn',
    description: 'Các câu hỏi sẽ bị xáo trộn',
  },
  {
    field: 'view_results',
    title: 'Xem kết quả',
    description: 'Sẽ hiển thị lại kết quả sau khi thực hiện khảo sát',
  },
  {
    field: 'public',
    title: 'Công khai',
    description:
      'Bất cứ sinh viên/giảng viên nào cũng có thể tham gia khảo sát',
  },
]

const initialValues = {
  limit: false,
  process_bar: false,
  shuffle_question_order: false,
  view_results: true,
  public: true,
  classes: [] as any[],
  students: [] as any[],
}

const SettingDialog = ({ open, onClose, data, onSuccess }) => {
  const [isSubmitLoading, setSubmitLoading] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [classes, setClasses] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])

  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    async onSubmit(values) {
      setSubmitLoading(true)
      try {
        const body: any = { ...values, classes: undefined, students: undefined }
        body.class_ids = values?.classes?.map((item) => item.id)
        body.student_ids = values?.students?.map((item) => item?.id)
        console.log(body)
        // onClose()
        onSuccess && onSuccess()
        await SurveyApi.updateSurveyOption(data?.id, body)
        toast.success('Cập nhật cài đặt khảo sát thành công')
      } catch (error) {
        toast.error('Đã xảy ra lỗi không xác định')
      }
      setSubmitLoading(false)
    },
  })

  const handleGetClassOptions = async (search = '') => {
    const res = await ClassApi.getAll({ search: search })
    setClasses(res.data)
  }

  const handleGetStudentOptions = async (search = '') => {
    const res = await StudentApi.getAll({ search: search })
    setStudents(res.data)
  }

  useEffect(() => {
    const handleGetOption = async () => {
      setLoading(true)
      try {
        formik.resetForm()
        if (data?.id) {
          const option = await SurveyApi.getSurveyOption(data?.id)
          formik.setValues(
            option?.data
              ? {
                  ...option?.data,
                  students: option?.students || [],
                  classes: option?.classes || [],
                }
              : initialValues,
          )
        }
      } catch (error) {}
      setLoading(false)
    }
    handleGetOption()
  }, [data])

  useEffect(() => {
    handleGetClassOptions()
    handleGetStudentOptions()
  }, [])

  const content = (
    <DialogContent className="">
      {options.map((item, i) => (
        <label
          className="flex cursor-pointer items-center justify-between py-3 transition-all hover:bg-neutral-50"
          htmlFor={item.field}
          key={i}
        >
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-neutral-600">{item.description}</p>
          </div>
          <Switch
            checked={!!formik.values[item?.field]}
            onChange={(e) =>
              formik.setFieldValue(item?.field, e.target.checked)
            }
            id={item.field}
          />
        </label>
      ))}
      {!formik.values.public && (
        <div className="py-3">
          <h3 className="font-medium">Lớp học được phép tham gia khảo sát</h3>
          <Autocomplete
            options={classes}
            getOptionLabel={(option) => option?.name}
            isOptionEqualToValue={(o, v) => o?.id === v?.id}
            size="small"
            value={null}
            className="mt-2"
            onInputChange={async (e, value) => handleGetClassOptions(value)}
            onChange={(e, value) => {
              formik.setFieldValue('classes', [
                value,
                ...formik.values.classes.filter(
                  (item) => item?.id != value?.id,
                ),
              ])
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Nhập lớp để thêm" value="" />
            )}
          />
          <div className="mt-4">
            {formik.values.classes?.map((item, i) => (
              <div key={i}>{item?.name}</div>
            ))}
          </div>
        </div>
      )}
      {!formik.values.public && (
        <div className="py-3">
          <h3 className="font-medium">Sinh viên được phép tham gia khảo sát</h3>
          <Autocomplete
            options={students}
            getOptionLabel={(option) => option?.name}
            isOptionEqualToValue={(o, v) => o?.id === v?.id}
            size="small"
            value={null}
            className="mt-2"
            onInputChange={async (e, value) => handleGetStudentOptions(value)}
            onChange={(e, value) => {
              formik.setFieldValue('students', [
                value,
                ...formik.values.students.filter(
                  (item) => item?.id != value?.id,
                ),
              ])
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Nhập sinh viên để thêm"
                value=""
              />
            )}
          />
          <div className="mt-4">
            {formik.values.students?.map((item, i) => (
              <div key={i}>{item?.name}</div>
            ))}
          </div>
        </div>
      )}
    </DialogContent>
  )

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Cài đặt biểu mẫu</DialogTitle>
        {isLoading ? (
          <div className="space-y-2 px-[16px]">
            {[...new Array(5)].map((item, i) => (
              <Skeleton height={30} key={i} />
            ))}
          </div>
        ) : (
          content
        )}
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitLoading}
            startIcon={<AiOutlineEdit />}
          >
            Sửa cài đặt
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default SettingDialog
