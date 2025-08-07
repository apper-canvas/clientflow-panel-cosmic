import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import MetricCard from "@/components/molecules/MetricCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import { dashboardService } from "@/services/api/dashboardService"

const Dashboard = () => {
  const [metrics, setMetrics] = useState([])
  const [recentActivities, setRecentActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setError("")
      setLoading(true)
      
      const [metricsData, activitiesData] = await Promise.all([
        dashboardService.getMetrics(),
        dashboardService.getRecentActivities()
      ])
      
      setMetrics(metricsData)
      setRecentActivities(activitiesData)
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading message="Loading dashboard..." />
  if (error) return <Error message={error} onRetry={loadDashboardData} />

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} {...metric} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ApperIcon name="Activity" className="h-5 w-5 text-primary" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.Id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-surface/50 to-transparent hover:from-surface hover:to-surface/50 transition-all duration-200"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === "call" ? "bg-success" : activity.type === "email" ? "bg-info" : "bg-warning"}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.contact} • {activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ApperIcon name="Zap" className="h-5 w-5 text-primary" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Add Contact", icon: "UserPlus", color: "from-primary to-secondary" },
                  { label: "Create Deal", icon: "TrendingUp", color: "from-success to-emerald-600" },
                  { label: "Schedule Call", icon: "Phone", color: "from-info to-blue-600" },
                  { label: "Send Email", icon: "Mail", color: "from-accent to-pink-600" },
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-lg bg-gradient-to-r ${action.color} text-white text-left hover:shadow-lg transition-all duration-200`}
                  >
                    <ApperIcon name={action.icon} className="h-6 w-6 mb-2" />
                    <p className="font-medium text-sm">{action.label}</p>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Pipeline Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="BarChart3" className="h-5 w-5 text-primary" />
              <span>Sales Pipeline Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { stage: "Prospects", count: 45, value: "$125,400", color: "bg-gray-500" },
                { stage: "Qualified", count: 23, value: "$89,200", color: "bg-info" },
                { stage: "Proposal", count: 12, value: "$156,800", color: "bg-warning" },
                { stage: "Closed Won", count: 8, value: "$98,600", color: "bg-success" },
              ].map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (index * 0.1) }}
                  className="text-center p-4 rounded-lg bg-gradient-to-br from-surface to-gray-50"
                >
                  <div className={`w-3 h-3 rounded-full ${stage.color} mx-auto mb-2`} />
                  <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stage.count}</p>
                  <p className="text-sm text-gray-600">{stage.value}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Dashboard