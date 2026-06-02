import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',

        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',

        outline:
          'border border-border bg-transparent text-foreground hover:bg-muted hover:text-foreground',

        ghost:
          'text-foreground hover:bg-muted hover:text-foreground',

        destructive:
          'bg-red-600 text-white hover:bg-red-700',

        link:
          'text-primary underline-offset-4 hover:underline',
      },

      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        buttonVariants({ variant, size }),
        className
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }