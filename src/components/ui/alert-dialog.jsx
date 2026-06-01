import * as React from 'react'
import { cn } from '../../lib/utils'
import { Button } from './button'

const AlertDialogContext = React.createContext({})

const AlertDialog = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = React.useState(open ?? false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <AlertDialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

const AlertDialogTrigger = React.forwardRef(({ asChild, ...props }, ref) => {
  const { onOpenChange } = React.useContext(AlertDialogContext)
  
  if (asChild) {
    return React.cloneElement(props.children, {
      onClick: () => onOpenChange?.(true),
    })
  }

  return (
    <button
      ref={ref}
      onClick={() => onOpenChange?.(true)}
      {...props}
    />
  )
})

AlertDialogTrigger.displayName = 'AlertDialogTrigger'

const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(AlertDialogContext)

  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/80"
        onClick={() => onOpenChange?.(false)}
      />
      <div
        ref={ref}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 rounded-lg',
          className,
        )}
        {...props}
      />
    </>
  )
})

AlertDialogContent.displayName = 'AlertDialogContent'

const AlertDialogHeader = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
)

AlertDialogHeader.displayName = 'AlertDialogHeader'

const AlertDialogFooter = ({ className, ...props }) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)

AlertDialogFooter.displayName = 'AlertDialogFooter'

const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn('text-lg font-semibold', className)} {...props} />
))

AlertDialogTitle.displayName = 'AlertDialogTitle'

const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))

AlertDialogDescription.displayName = 'AlertDialogDescription'

const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => {
  const { onOpenChange } = React.useContext(AlertDialogContext)

  return (
    <Button
      ref={ref}
      onClick={(e) => {
        props.onClick?.(e)
        onOpenChange?.(false)
      }}
      className={className}
      {...props}
    />
  )
})

AlertDialogAction.displayName = 'AlertDialogAction'

const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => {
  const { onOpenChange } = React.useContext(AlertDialogContext)

  return (
    <Button
      ref={ref}
      variant="outline"
      onClick={(e) => {
        props.onClick?.(e)
        onOpenChange?.(false)
      }}
      className={className}
      {...props}
    />
  )
})

AlertDialogCancel.displayName = 'AlertDialogCancel'

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
