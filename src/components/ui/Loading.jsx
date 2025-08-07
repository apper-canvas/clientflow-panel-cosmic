import { motion } from "framer-motion"

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center space-x-4 mb-6">
        <div className="rounded-full bg-gradient-to-r from-gray-200 to-gray-300 h-12 w-12"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 mb-3"></div>
                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3"></div>
              </div>
              <div className="h-12 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-card">
        <div className="p-6 border-b border-gray-200">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4"></div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded flex-1"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded flex-1"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded flex-1"></div>
                <div className="h-8 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Loading = ({ message = "Loading..." }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-8"
    >
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
            />
          </div>
          <p className="text-lg font-medium text-gray-600">{message}</p>
        </div>
        <LoadingSkeleton />
      </div>
    </motion.div>
  )
}

export default Loading