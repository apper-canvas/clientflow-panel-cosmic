import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  title = "Oops! Something went wrong" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-r from-error to-red-600 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertTriangle" className="h-10 w-10 text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="RefreshCw" className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
      )}
    </motion.div>
  )
}

export default Error