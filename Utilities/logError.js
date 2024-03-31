import { toast } from 'react-toastify'

export const logError = (err) => {
  toast.error(err, {
    position: 'top-right',
    hideProgressBar: true,
    pauseOnHover: false,
    closeOnClick: true,
    theme: 'dark',
  })
}
