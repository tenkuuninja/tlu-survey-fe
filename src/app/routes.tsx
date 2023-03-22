import { createBrowserRouter } from 'react-router-dom'
import MainLayout from 'common/layouts/MainLayout'
import SurveyPage from 'pages/survey'
import AdminLayout from 'common/layouts/AdminLayout'
import SurveyDashboardPage from 'pages/dashboard/survey'
import StudentDashboardPage from 'pages/dashboard/student'
import HomePage from 'pages/home'
import LoginPage from 'pages/login'
import LecturerDashboardPage from 'pages/dashboard/lecturer'
import ClassDashboardPage from 'pages/dashboard/class'
import SubjectDashboardPage from 'pages/dashboard/subject'
import ChangePasswordDashboardPage from 'pages/dashboard/change-pasword'
import DashboardPage from 'pages/dashboard/home'
import ClassDashboardStudentPage from 'pages/dashboard/class/StudentView'
import ClassDashboardTeacherPage from 'pages/dashboard/class/TeacherView'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <HomePage />,
    children: [
      {
        path: '/',
        index: true,
        element: <HomePage />,
      },
      {
        path: '/dang-nhap',
        element: <LoginPage />,
      },
      {
        path: '/khao-sat/:slug',
        element: <SurveyPage />,
      },
    ],
  },
  {
    path: '/bang-dieu-khien',
    element: <AdminLayout />,
    children: [
      {
        path: '/bang-dieu-khien',
        element: <DashboardPage />,
      },
      {
        path: '/bang-dieu-khien/quan-ly-khao-sat',
        element: <SurveyDashboardPage />,
      },
      {
        path: '/bang-dieu-khien/quan-ly-sinh-vien',
        element: <StudentDashboardPage />,
      },
      {
        path: '/bang-dieu-khien/quan-ly-giang-vien',
        element: <LecturerDashboardPage />,
      },
      {
        path: '/bang-dieu-khien/quan-ly-lop-hoc',
        element: <ClassDashboardPage />,
      },
      {
        path: '/bang-dieu-khien/lop-hoc',
        element: <ClassDashboardStudentPage />,
      },
      {
        path: '/bang-dieu-khien/lop-day',
        element: <ClassDashboardTeacherPage />,
      },
      {
        path: '/bang-dieu-khien/quan-ly-mon-hoc',
        element: <SubjectDashboardPage />,
      },
      {
        path: '/bang-dieu-khien/doi-mat-khau',
        element: <ChangePasswordDashboardPage />,
      },
    ],
  },
])

export default router
