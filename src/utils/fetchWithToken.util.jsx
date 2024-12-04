import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { removeCookiesSession, removeLocalStorageState } from './Functions.util'
import { PostNewAccessToken } from '@services/PostNewAccessToken.service'
import {
  BAD_REQUEST_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE
} from './StatusCodes.util'

const fetchWithToken = async (
  url,
  options = {},
  contentType = 'application/json'
) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL

  const token = Cookies.get('accessToken')

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`
  }

  if (contentType) {
    headers['Content-Type'] = contentType
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers
    })

    const data = await response.json()

    if (
      response.ok &&
      data.statusCode !== BAD_REQUEST_STATUS_CODE &&
      data.statusCode !== FORBIDDEN_STATUS_CODE &&
      data.statusCode !== UNAUTHORIZED_STATUS_CODE
    ) {
      return { success: true, data }
    }

    if (response.ok && data.statusCode === BAD_REQUEST_STATUS_CODE) {
      toast.error(data.message)
      return { success: false, data }
    }

    if (data.statusCode === UNAUTHORIZED_STATUS_CODE) {
      const refreshResult = await PostNewAccessToken()

      if (
        refreshResult.success &&
        refreshResult.data.statusCode !== FORBIDDEN_STATUS_CODE
      ) {
        const newAccessToken = refreshResult.data.accessToken

        if (newAccessToken) Cookies.set('accessToken', newAccessToken)

        const retryResponse = await fetch(`${BASE_URL}${url}`, {
          ...options,
          headers: {
            ...options.headers,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAccessToken}`
          }
        })

        if (!retryResponse.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await retryResponse.json()

        return { success: true, data }
      } else if (refreshResult.data.statusCode === FORBIDDEN_STATUS_CODE) {
        removeLocalStorageState()
        removeCookiesSession()

        window.location.href = '/'
        return { success: false, error: data.message }
      } else {
        throw new Error('Could not refresh token')
      }
    }

    throw new Error('Network response was not ok')
  } catch (error) {
    console.error('Error in fetchWithToken:', error)

    return { success: false, error: error.message }
  }
}

export { fetchWithToken }
