import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card } from '../components/ui/card'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = () => {
    const cleanEmail = email.trim().toLowerCase()

    if (!cleanEmail.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    setError('')
    dispatch(register(cleanEmail))
    navigate('/dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="p-6 w-[360px] space-y-4">

        <h1 className="text-xl font-bold">Create Account</h1>

        <Input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <Button className="w-full" onClick={handleSignup}>
          Sign Up
        </Button>

        <p className="text-xs text-gray-400">
          Demo system: email only (no password)
        </p>

      </Card>
    </div>
  )
}