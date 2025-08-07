import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Deals = () => {
  const pipelineStages = [
    { name: "Prospecting", count: 12, value: "$45,200", color: "bg-gray-500" },
    { name: "Qualified", count: 8, value: "$32,800", color: "bg-info" },
    { name: "Proposal", count: 5, value: "$78,900", color: "bg-warning" },
    { name: "Negotiation", count: 3, value: "$45,600", color: "bg-accent" },
    { name: "Closed Won", count: 2, value: "$25,400", color: "bg-success" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Deals</h1>
          <p className="text-gray-600">Track your sales opportunities and pipeline progress.</p>
        </div>
        <Button className="mt-4 sm:mt-0 flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Add Deal</span>
        </Button>
      </motion.div>

      {/* Pipeline Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="TrendingUp" className="h-5 w-5 text-primary" />
              <span>Sales Pipeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {pipelineStages.map((stage, index) => (
                <motion.div
                  key={stage.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className="bg-gradient-to-br from-surface to-gray-50 p-4 rounded-lg border border-gray-200 text-center hover:shadow-md transition-all duration-200"
                >
                  <div className={`w-4 h-4 ${stage.color} rounded-full mx-auto mb-3`} />
                  <h3 className="font-semibold text-gray-900 mb-2">{stage.name}</h3>
                  <p className="text-2xl font-bold text-gray-900">{stage.count}</p>
                  <p className="text-sm text-gray-600 mt-1">{stage.value}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Placeholder Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center py-16"
      >
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="TrendingUp" className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Deal Management Coming Soon</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Track your sales opportunities with visual pipeline management, deal stages, and revenue forecasting.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline">
            <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
            View Pipeline
          </Button>
          <Button>
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Create Deal
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default Deals