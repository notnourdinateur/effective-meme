import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card } from '../components/ui/card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = () => {
    dispatch(login(email))
    navigate('/dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="p-6 w-[350px] space-y-4">
        <h1 className="text-xl font-bold">Login</h1>

        <Input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>

        <p className="text-xs text-gray-500">
          Allowed: admin@demo.com, buyer@demo.com, guest@demo.com
        </p>
      </Card>
    </div>
  )
}