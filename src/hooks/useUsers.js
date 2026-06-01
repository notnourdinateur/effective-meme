import useApiQuery from './useApiQuery'

function useUsers() {
  return useApiQuery('/users', {
    transform: (users) => users.slice(0, 8),
  })
}

export default useUsers
