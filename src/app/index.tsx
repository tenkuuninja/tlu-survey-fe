import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import OverrideMuiTheme from './OverrideMuiTheme'
import router from './routes'
import store from 'common/redux'
import '../styles/index.scss'

function App() {
  return (
    <OverrideMuiTheme>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <ToastContainer autoClose={3000} closeOnClick />
    </OverrideMuiTheme>
  )
}

export default App
