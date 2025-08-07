import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Reports = () => {
  const reportCategories = [
    {
      title: "Sales Reports",
      icon: "TrendingUp",
      color: "from-primary to-secondary",
      reports: [
        "Monthly Sales Summary",
        "Deal Conversion Rates",
        "Revenue Forecasting",
        "Sales Team Performance",
      ]
    },
    {
      title: "Contact Analytics",
      icon: "Users",
      color: "from-success to-emerald-600",
      reports: [
        "Contact Growth Trends",
        "Industry Distribution",
        "Engagement Metrics",
        "Contact Source Analysis",
      ]
    },
    {
      title: "Activity Reports",
      icon: "Activity",
      color: "from-info to-blue-600",
      reports: [
        "Activity Volume Trends",
        "Response Time Analysis",
        "Meeting Success Rates",
        "Communication Patterns",
      ]
    },
    {
      title: "Performance Metrics",
      icon: "BarChart3",
      color: "from-accent to-pink-600",
      reports: [
        "KPI Dashboard",
        "Goal Achievement",
        "Team Productivity",
        "ROI Analysis",
      ]
    }
  ]

  const quickStats = [
    { label: "Total Revenue", value: "$248,500", change: "+12%", icon: "DollarSign" },
    { label: "New Contacts", value: "47", change: "+23%", icon: "UserPlus" },
    { label: "Deals Closed", value: "15", change: "+8%", icon: "CheckCircle" },
    { label: "Conversion Rate", value: "32%", change: "+5%", icon: "Percent" },
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-gray-600">Analyze your sales performance and business metrics.</p>
        </div>
        <Button className="mt-4 sm:mt-0 flex items-center space-x-2">
          <ApperIcon name="Download" className="h-4 w-4" />
          <span>Export Data</span>
        </Button>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-success' : 'text-error'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-3 rounded-full">
                    <ApperIcon name={stat.icon} className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {reportCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (index * 0.1) }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className={`bg-gradient-to-r ${category.color} p-2 rounded-full`}>
                    <ApperIcon name={category.icon} className="h-5 w-5 text-white" />
                  </div>
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.reports.map((report, reportIndex) => (
                    <motion.div
                      key={report}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) + (reportIndex * 0.05) }}
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-surface/50 to-transparent hover:from-surface hover:to-surface/50 transition-all duration-200 group cursor-pointer"
                    >
                      <span className="font-medium text-gray-900 group-hover:text-primary">
                        {report}
                      </span>
                      <ApperIcon 
                        name="ChevronRight" 
                        className="h-4 w-4 text-gray-400 group-hover:text-primary transform group-hover:translate-x-1 transition-all duration-200" 
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <ApperIcon name="LineChart" className="h-5 w-5 text-primary" />
                  <span>Revenue Trend</span>
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="MoreHorizontal" className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-surface to-gray-50 rounded-lg">
                <div className="text-center">
                  <ApperIcon name="LineChart" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Revenue chart will appear here</p>
                  <p className="text-sm text-gray-400">Interactive charts coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pipeline Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <ApperIcon name="PieChart" className="h-5 w-5 text-primary" />
                  <span>Sales Pipeline</span>
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="MoreHorizontal" className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-surface to-gray-50 rounded-lg">
                <div className="text-center">
                  <ApperIcon name="PieChart" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Pipeline chart will appear here</p>
                  <p className="text-sm text-gray-400">Visual analytics coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Placeholder Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center py-16"
      >
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="BarChart3" className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Analytics Coming Soon</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Comprehensive reporting with interactive charts, custom filters, automated insights, and data export capabilities.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline">
            <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
            Filter Data
          </Button>
          <Button>
            <ApperIcon name="Download" className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default Reports