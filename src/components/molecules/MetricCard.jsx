import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const MetricCard = ({ label, value, trend, trendDirection, icon, index = 0 }) => {
  const getTrendColor = () => {
    if (trendDirection === "up") return "text-success"
    if (trendDirection === "down") return "text-error"
    return "text-gray-500"
  }

  const getTrendIcon = () => {
    if (trendDirection === "up") return "TrendingUp"
    if (trendDirection === "down") return "TrendingDown"
    return "Minus"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-white to-surface/50 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (index * 0.1) + 0.2, duration: 0.4, type: "spring" }}
              >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {value.toLocaleString()}
                </h3>
              </motion.div>
              {trend !== undefined && (
                <div className={`flex items-center mt-2 ${getTrendColor()}`}>
                  <ApperIcon name={getTrendIcon()} className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">
                    {Math.abs(trend)}%
                  </span>
                </div>
              )}
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-3 rounded-full">
              <ApperIcon name={icon} className="h-8 w-8 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default MetricCard