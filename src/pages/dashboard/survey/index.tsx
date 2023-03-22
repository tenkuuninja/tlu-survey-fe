import {
  Button,
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
  Tooltip,
} from '@mui/material'
import SurveyApi from 'common/apis/survey'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlinePlus,
  AiOutlineSearch,
  AiFillCaretRight,
  AiOutlineBarChart,
  AiOutlineSetting,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import DeleteDialog from './DeleteDialog'
import EditDialog from './EditDialog'
import SelfSurveyDialog from './SelfSurvey'
import SettingDialog from './SettingDialog'
import StatisticDialog from './StatisticDialog'

const SurveyDashboardPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [filter, setFilter] = useState<any>({})
  const [surveys, setSurveys] = useState<any[]>([])
  const [itemToUpdate, setItemToUpdate] = useState<any>(null)
  const [itemToDelete, setItemToDelete] = useState<any>(null)
  const [itemToStatistic, setItemToStatistic] = useState<any>(null)
  const [itemToSetting, setItemToSetting] = useState<any>(null)
  const [itemToShowMySelfResult, setItemToShowSelfResult] = useState<any>(null)

  const handleFetchItem = async () => {
    setLoading(true)
    const res = await SurveyApi.getAll(filter)
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
      width: '60px',
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
      name: 'Lượt tham gia',
      selector: (row) =>
        row?.user_surveys?.filter((item) => item?.is_finish)?.length || 0,
    },
    {
      name: 'Hành động',
      selector: (row) => (
        <>
          <Link to={`/survey/${row?.id}`} target="_blank">
            <Tooltip arrow title="Khảo sát" placement="top">
              <IconButton size="small" color="info">
                <AiFillCaretRight />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip arrow title="Xem kết quả" placement="top">
            <IconButton
              size="small"
              color="info"
              onClick={() => setItemToShowSelfResult(row)}
            >
              <AiOutlineEye />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Thống kê" placement="top">
            <IconButton
              size="small"
              color="info"
              onClick={() => setItemToStatistic(row)}
            >
              <AiOutlineBarChart />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Cài đặt" placement="top">
            <IconButton
              size="small"
              color="info"
              onClick={() => setItemToSetting(row)}
            >
              <AiOutlineSetting />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Sửa" placement="top">
            <IconButton
              size="small"
              color="info"
              onClick={() => setItemToUpdate(row)}
            >
              <AiOutlineEdit />
            </IconButton>
          </Tooltip>

          <Tooltip arrow title="Xoá" placement="top">
            <IconButton
              size="small"
              color="error"
              onClick={() => setItemToDelete(row)}
            >
              <AiOutlineDelete />
            </IconButton>
          </Tooltip>
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
      <div className="mt-4 flex items-center justify-end">
        <TextField
          size="small"
          value={filter?.search || ''}
          onChange={(e) => setFilter({ search: e.target.value })}
          fullWidth
          placeholder="Tìm kiếm"
          sx={{ maxWidth: 300 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip arrow title="Tìm kiếm" placement="top">
                  <IconButton onClick={handleFetchItem}>
                    <AiOutlineSearch />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </div>
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
        {!isLoading && <DataTable dense data={surveys} columns={columns} />}
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
      <StatisticDialog
        open={!!itemToStatistic}
        onClose={() => setItemToStatistic(null)}
        data={itemToStatistic}
        onSuccess={setItemToStatistic}
      />
      <SettingDialog
        open={!!itemToSetting}
        onClose={() => setItemToSetting(null)}
        data={itemToSetting}
        onSuccess={setItemToSetting}
      />
      <SelfSurveyDialog
        open={!!itemToShowMySelfResult}
        onClose={() => setItemToShowSelfResult(null)}
        data={itemToShowMySelfResult}
      />
    </div>
  )
}

export default SurveyDashboardPage
