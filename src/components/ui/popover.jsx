import * as React from 'react'
import { cn } from '../../lib/utils'

const PopoverContext = React.createContext({})

function Popover({ children }) {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative">
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef(({ asChild, children, ...props }, ref) => {
  const { setOpen } = React.useContext(PopoverContext)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      ...props,
      onClick: (e) => {
        children.props.onClick?.(e)
        setOpen((prev) => !prev)
      },
    })
  }

  return (
    <button ref={ref} onClick={() => setOpen((prev) => !prev)} {...props}>
      {children}
    </button>
  )
})
PopoverTrigger.displayName = 'PopoverTrigger'

const PopoverContent = React.forwardRef(({ className, align = 'end', children, ...props }, ref) => {
  const { open } = React.useContext(PopoverContext)

  if (!open) return null

  return (
    <div
      ref={ref}
      style={{ backgroundColor: '#1c3152' }}
      className={cn(
        'absolute top-full z-50 mt-2 rounded-xl border border-line-600 shadow-2xl shadow-black/80',
        align === 'end' ? 'right-0' : align === 'start' ? 'left-0' : 'left-1/2 -translate-x-1/2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})
PopoverContent.displayName = 'PopoverContent'

export { Popover, PopoverTrigger, PopoverContent }
