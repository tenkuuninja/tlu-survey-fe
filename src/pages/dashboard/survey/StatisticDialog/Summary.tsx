import { Paper } from '@mui/material'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import 'chart.js/auto'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Summary {
  survey: any
  answers: any[]
}

export default function Summary({ survey, answers }: Summary) {
  return (
    <form className="mx-auto max-w-[576px] py-4">
      <Paper sx={{ p: 2 }}>
        <h1 className="text-[28px]">{survey?.title}</h1>
      </Paper>
      {survey?.questions.map((question, i) => {
        console.log({
          label: question?.options?.map((opt) => opt?.title),
          data: question?.options?.map(
            (opt) =>
              answers.filter((ans) => ans?.option_id === opt?.id)?.length,
          ),
        })

        const colors = [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
        ]

        return (
          <Paper className="" sx={{ p: 2, mt: 2 }} key={i}>
            <h3>{question?.title} </h3>
            {[1, 2].includes(question?.type_id) && (
              <div>
                <Pie
                  data={{
                    labels: question?.options?.map((opt) => opt?.title),
                    datasets: [
                      {
                        label: 'Số lựa chọn',
                        data: question?.options?.map(
                          (opt) =>
                            answers.filter((ans) => ans?.option_id === opt?.id)
                              ?.length || 0,
                        ),
                        backgroundColor: colors,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }}
                />
              </div>
            )}
            {[3].includes(question?.type_id) && (
              <div className="pt-[16px]">
                <Bar
                  data={{
                    labels: question?.options?.map((opt) => opt?.title),
                    datasets: [
                      {
                        label: 'Đếm',
                        data: question?.options?.map(
                          (opt) =>
                            answers.filter((ans) => ans?.option_id === opt?.id)
                              ?.length || 0,
                        ),
                        backgroundColor: colors,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            )}
            {question?.type_id === 4 && (
              <div className="mt-[16px] space-y-2">
                <p className="text-[14px]">
                  {answers?.filter((item) => item?.answer_text !== null)
                    ?.length || 0}{' '}
                  câu trả lời
                </p>
                {[
                  ...new Set(
                    answers
                      ?.filter((item) => item?.answer_text !== null)
                      ?.map((item) => item?.answer_text),
                  ),
                ].map((item, i) => (
                  <div className="bg-neutral-100 p-2" key={i}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </Paper>
        )
      })}
    </form>
  )
}
