import { useCallback, useEffect, useState } from 'react'
import { apiClient } from '../services/apiClient'

function useApiQuery(path, options = {}) {
  const { enabled = true, transform } = options
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const run = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const result = await apiClient(path)
      const payload = typeof transform === 'function' ? transform(result) : result
      setData(payload)
    } catch (requestError) {
      setError(requestError.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }, [path, transform])

  useEffect(() => {
    if (!enabled) {
      return
    }

    run()
  }, [enabled, run])

  return {
    data,
    loading,
    error,
    refetch: run,
  }
}

export default useApiQuery
