import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const Activities = () => {
  const upcomingActivities = [
    { id: 1, type: "Meeting", title: "Quarterly Review", contact: "John Smith", time: "2:00 PM Today", priority: "high" },
    { id: 2, type: "Call", title: "Follow-up Call", contact: "Sarah Johnson", time: "10:00 AM Tomorrow", priority: "medium" },
    { id: 3, type: "Email", title: "Proposal Follow-up", contact: "Mike Davis", time: "3:00 PM Tomorrow", priority: "low" },
  ]

  const activityTypes = [
    { name: "Meetings", count: 12, icon: "Calendar", color: "from-primary to-secondary" },
    { name: "Calls", count: 25, icon: "Phone", color: "from-success to-emerald-600" },
    { name: "Emails", count: 48, icon: "Mail", color: "from-info to-blue-600" },
    { name: "Tasks", count: 15, icon: "CheckSquare", color: "from-accent to-pink-600" },
  ]

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="error">High</Badge>
      case "medium":
        return <Badge variant="warning">Medium</Badge>
      case "low":
        return <Badge variant="secondary">Low</Badge>
      default:
        return <Badge>Normal</Badge>
    }
  }

  const getActivityIcon = (type) => {
    switch (type.toLowerCase()) {
      case "meeting":
        return "Calendar"
      case "call":
        return "Phone"
      case "email":
        return "Mail"
      default:
        return "Activity"
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Activities</h1>
          <p className="text-gray-600">Track and manage your sales activities and interactions.</p>
        </div>
        <Button className="mt-4 sm:mt-0 flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Schedule Activity</span>
        </Button>
      </motion.div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activityTypes.map((activity, index) => (
          <motion.div
            key={activity.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">{activity.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{activity.count}</p>
                  </div>
                  <div className={`bg-gradient-to-r ${activity.color} p-3 rounded-full`}>
                    <ApperIcon name={activity.icon} className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ApperIcon name="Clock" className="h-5 w-5 text-primary" />
                <span>Upcoming Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-surface/50 to-transparent hover:from-surface hover:to-surface/50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <ApperIcon name={getActivityIcon(activity.type)} className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.contact} • {activity.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(activity.priority)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ApperIcon name="Activity" className="h-5 w-5 text-primary" />
                <span>Recent Activity Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="bg-gradient-to-r from-surface to-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Timeline" className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">Activity timeline will appear here</p>
                <Button variant="outline" size="sm">
                  <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                  Log Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Placeholder Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center py-16"
      >
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Activity" className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Activity Tracking Coming Soon</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Comprehensive activity management with automated logging, follow-up reminders, and performance analytics.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline">
            <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
          <Button>
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default Activities