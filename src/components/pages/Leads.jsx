import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const Leads = () => {
  const leadStats = [
    { label: "Total Leads", value: 47, icon: "Target", color: "from-primary to-secondary" },
    { label: "New This Week", value: 12, icon: "TrendingUp", color: "from-success to-emerald-600" },
    { label: "Qualified", value: 23, icon: "CheckCircle", color: "from-info to-blue-600" },
    { label: "Conversion Rate", value: "32%", icon: "Percent", color: "from-accent to-pink-600" },
  ]

  const leadSources = [
    { name: "Website", count: 18, percentage: 38 },
    { name: "Referrals", count: 12, percentage: 26 },
    { name: "Social Media", count: 8, percentage: 17 },
    { name: "Email Campaign", count: 6, percentage: 13 },
    { name: "Cold Calls", count: 3, percentage: 6 },
  ]

  const recentLeads = [
    { id: 1, name: "Alice Thompson", company: "TechCorp Inc", score: 85, source: "Website", status: "qualified" },
    { id: 2, name: "Robert Chen", company: "Innovation Labs", score: 72, source: "Referral", status: "new" },
    { id: 3, name: "Sarah Martinez", company: "Global Solutions", score: 91, source: "Social Media", status: "qualified" },
    { id: 4, name: "David Wilson", company: "StartupXYZ", score: 58, source: "Email", status: "nurturing" },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "qualified":
        return <Badge variant="success">Qualified</Badge>
      case "new":
        return <Badge variant="info">New</Badge>
      case "nurturing":
        return <Badge variant="warning">Nurturing</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-success"
    if (score >= 60) return "text-warning"
    return "text-error"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leads</h1>
          <p className="text-gray-600">Manage and qualify your potential customers.</p>
        </div>
        <Button className="mt-4 sm:mt-0 flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Add Lead</span>
        </Button>
      </motion.div>

      {/* Lead Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {leadStats.map((stat, index) => (
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
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-full`}>
                    <ApperIcon name={stat.icon} className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lead Sources */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ApperIcon name="PieChart" className="h-5 w-5 text-primary" />
                <span>Lead Sources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leadSources.map((source, index) => (
                  <motion.div
                    key={source.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full" />
                      <span className="font-medium text-gray-900">{source.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${source.percentage}%` }}
                          transition={{ delay: 0.5 + (index * 0.1), duration: 0.8 }}
                          className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600 min-w-[3rem] text-right">
                        {source.count}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Leads */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <ApperIcon name="Users" className="h-5 w-5 text-primary" />
                  <span>Recent Leads</span>
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLeads.map((lead, index) => (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-surface/50 to-transparent hover:from-surface hover:to-surface/50 transition-all duration-200"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-sm text-gray-600">{lead.company}</p>
                      <p className="text-xs text-gray-500 mt-1">Source: {lead.source}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className={`text-sm font-bold ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </p>
                        <p className="text-xs text-gray-500">Score</p>
                      </div>
                      {getStatusBadge(lead.status)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Lead Qualification Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Filter" className="h-5 w-5 text-primary" />
              <span>Lead Qualification Funnel</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { stage: "Raw Leads", count: 47, color: "bg-gray-400" },
                { stage: "Contacted", count: 35, color: "bg-info" },
                { stage: "Interested", count: 28, color: "bg-warning" },
                { stage: "Qualified", count: 23, color: "bg-accent" },
                { stage: "Converted", count: 15, color: "bg-success" },
              ].map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                  className="text-center"
                >
                  <div className={`${stage.color} text-white p-4 rounded-t-lg`}>
                    <p className="text-2xl font-bold">{stage.count}</p>
                  </div>
                  <div className="bg-gradient-to-r from-surface to-gray-50 p-3 rounded-b-lg border-l-4 border-r-4 border-b-4 border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{stage.stage}</p>
                  </div>
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
        transition={{ delay: 0.7 }}
        className="text-center py-16"
      >
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Target" className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Lead Management Coming Soon</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Comprehensive lead scoring, automated nurturing campaigns, and advanced qualification workflows.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline">
            <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
            Filter Leads
          </Button>
          <Button>
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Import Leads
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default Leads