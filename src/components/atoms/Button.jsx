import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const buttonVariants = {
  default: "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-button",
  secondary: "bg-surface hover:bg-gray-100 text-gray-900 border border-gray-200",
  ghost: "hover:bg-surface text-gray-700 hover:text-gray-900",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white",
  danger: "bg-gradient-to-r from-error to-red-600 hover:from-error/90 hover:to-red-600/90 text-white",
}

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  default: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
}

const Button = forwardRef(({ className, variant = "default", size = "default", children, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        "transform hover:scale-[1.02] active:scale-[0.98]",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button