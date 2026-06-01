import useFetchUsers from './useFetchUsers'
function UsersList() {
  const { users, loading, error, refetch } = useFetchUsers()

  return (
    <div style={{ padding: '20px' }}>
      <h2>Users</h2>
      <button onClick={refetch} disabled={loading}>
        {loading ? 'Loading...' : 'Refetch Users'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {loading && !users.length && <p>Loading users...</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default UsersList
