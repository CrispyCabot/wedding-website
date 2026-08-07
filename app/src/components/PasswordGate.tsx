import { useState } from 'react'
import './PasswordGate.css'

const PASSWORD = 'mohican2027'
const STORAGE_KEY = 'wedding_unlocked'

interface Props {
  children: React.ReactNode
}

export default function PasswordGate({ children }: Props) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === '1'
  )
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  if (unlocked) return <>{children}</>

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, '1')
      setUnlocked(true)
    } else {
      setError(true)
      setInput('')
    }
  }

  return (
    <div className="gate-overlay">
      <div className="gate-card">
        <p className="gate-script">Maddie &amp; Chris</p>
        <h1 className="gate-heading">Coming Soon</h1>
        <p className="gate-sub">Our wedding website is still being prepared.<br />Enter the password to preview it.</p>
        <form onSubmit={handleSubmit} className="gate-form">
          <input
            className={`gate-input${error ? ' gate-input--error' : ''}`}
            type="password"
            placeholder="Password"
            value={input}
            autoFocus
            onChange={e => { setInput(e.target.value); setError(false) }}
          />
          {error && <p className="gate-error">Incorrect password — try again.</p>}
          <button className="gate-btn" type="submit">Enter</button>
        </form>
      </div>
    </div>
  )
}
