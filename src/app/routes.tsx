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
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/survey/:id',
        element: <SurveyPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <AdminLayout />,
    children: [
      {
        path: '/dashboard/survey',
        element: <SurveyDashboardPage />,
      },
      {
        path: '/dashboard/student',
        element: <StudentDashboardPage />,
      },
      {
        path: '/dashboard/lecturer',
        element: <LecturerDashboardPage />,
      },
      {
        path: '/dashboard/class',
        element: <ClassDashboardPage />,
      },
      {
        path: '/dashboard/subject',
        element: <SubjectDashboardPage />,
      },
      {
        path: '/dashboard/change-password',
        element: <ChangePasswordDashboardPage />,
      },
    ],
  },
])

export default router
