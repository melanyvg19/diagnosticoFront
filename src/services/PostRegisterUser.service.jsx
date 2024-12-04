import { toast } from 'react-toastify'
import {
  BAD_REQUEST_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE
} from '@utils/StatusCodes.util'

const PostRegisterUser = async (newUser) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL

  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(newUser)
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()

    if (
      response.ok &&
      (data?.statusCode === UNAUTHORIZED_STATUS_CODE ||
        data?.statusCode === BAD_REQUEST_STATUS_CODE)
    ) {
      toast.error(data?.message)
      throw new Error(data?.message)
    }

    if (
      response.ok &&
      data?.statusCode !== UNAUTHORIZED_STATUS_CODE &&
      data?.statusCode !== FORBIDDEN_STATUS_CODE
    ) {
      return { success: true, data }
    }

    return { success: false, data }
  } catch (error) {
    console.error('Error registering user:', error)

    return { success: false, error: error.message }
  }
}

export { PostRegisterUser }
