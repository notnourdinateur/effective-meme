import { useSelector } from 'react-redux'
import { Card } from '../components/ui/card'

export default function UserProfilePage() {
  const email = useSelector((state) => state.auth.currentUserEmail)

  const role = email === 'admin@demo.com'
    ? 'Admin'
    : email
    ? 'User'
    : 'Guest'

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="p-6 w-[350px] space-y-3">
        <h1 className="text-xl font-bold">User Profile</h1>

        <p><strong>Email:</strong> {email || 'Not logged in'}</p>
        <p><strong>Role:</strong> {role}</p>
      </Card>
    </div>
  )
}