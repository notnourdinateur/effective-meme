import { useState, useEffect } from 'react'
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);
function useFetchUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      )
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(shuffleArray(data));
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
  }
}

export default useFetchUsers
