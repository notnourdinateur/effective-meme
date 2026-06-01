import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { login, logout } from '../../store/authSlice'

function AuthPanel() {
  const dispatch = useDispatch()
  const allowedEmails = useSelector((state) => state.auth.allowedEmails)
  const currentUserEmail = useSelector((state) => state.auth.currentUserEmail)
  const [selectedEmail, setSelectedEmail] = useState(allowedEmails[0] ?? '')

  useEffect(() => {
    if (!selectedEmail && allowedEmails[0]) {
      setSelectedEmail(allowedEmails[0])
    }
  }, [allowedEmails, selectedEmail])

  const handleLogin = () => {
    dispatch(login(selectedEmail))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authentication</CardTitle>
        <CardDescription>Choose one of the predefined emails to sign in.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentUserEmail ? (
          <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm text-ink-300">Signed in as</p>
              <p className="font-medium text-ink-50">{currentUserEmail}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Authenticated</Badge>
              <Button variant="outline" onClick={() => dispatch(logout())}>
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm text-ink-300" htmlFor="auth-email">
                Email
              </label>
              <Input
                id="auth-email"
                list="allowed-auth-emails"
                value={selectedEmail}
                onChange={(event) => setSelectedEmail(event.target.value)}
                placeholder="Select a predefined email"
              />
              <datalist id="allowed-auth-emails">
                {allowedEmails.map((email) => (
                  <option key={email} value={email} />
                ))}
              </datalist>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={handleLogin} disabled={!selectedEmail}>
                Login
              </Button>
              <p className="text-sm text-ink-400">
                Cart actions are enabled after login.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AuthPanel
