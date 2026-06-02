import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, register } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card } from '../components/ui/card'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allowedEmails = useSelector(
    (state) => state.auth.allowedEmails
  )

  const handleSubmit = () => {
    const cleanEmail = email.trim().toLowerCase()

    if (!cleanEmail.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    setError('')

    if (allowedEmails.includes(cleanEmail)) {
      dispatch(login(cleanEmail))
    } else {
      dispatch(register(cleanEmail))
    }

    navigate('/profile')
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="p-6 w-[400px] space-y-4">
        <h1 className="text-2xl font-bold">
          Login / Sign Up
        </h1>

        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <Button
          className="w-full"
          onClick={handleSubmit}
        >
          Continue
        </Button>

        <p className="text-xs text-gray-400">
          Existing email = Login
          <br />
          New email = Account creation
        </p>
      </Card>
    </div>
  )
}