import { toast } from 'react-toastify'
import {
  BAD_REQUEST_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE
} from '@utils/StatusCodes.util'

const PostRegisterCompany = async (newCompany) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL

  try {
    const response = await fetch(`${BASE_URL}/api/empresa`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(newCompany)
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
    console.error('Error registering company:', error)

    return { success: false, error: error.message }
  }
}

export { PostRegisterCompany }
