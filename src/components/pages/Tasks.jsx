import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const Tasks = () => {
  const taskStats = [
    { label: "Total Tasks", value: 24, icon: "CheckSquare", color: "from-primary to-secondary" },
    { label: "Completed", value: 18, icon: "CheckCircle", color: "from-success to-emerald-600" },
    { label: "In Progress", value: 4, icon: "Clock", color: "from-warning to-yellow-600" },
    { label: "Overdue", value: 2, icon: "AlertCircle", color: "from-error to-red-600" },
  ]

  const upcomingTasks = [
    { id: 1, title: "Follow up with Johnson Corp", due: "Today 3:00 PM", priority: "high", status: "pending" },
    { id: 2, title: "Prepare quarterly report", due: "Tomorrow 9:00 AM", priority: "medium", status: "in-progress" },
    { id: 3, title: "Review contract proposal", due: "Dec 15, 2:00 PM", priority: "high", status: "pending" },
    { id: 4, title: "Update CRM data", due: "Dec 16, 10:00 AM", priority: "low", status: "pending" },
  ]

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="error">High Priority</Badge>
      case "medium":
        return <Badge variant="warning">Medium</Badge>
      case "low":
        return <Badge variant="secondary">Low</Badge>
      default:
        return <Badge>Normal</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "CheckCircle"
      case "in-progress":
        return "Clock"
      case "overdue":
        return "AlertCircle"
      default:
        return "Circle"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tasks</h1>
          <p className="text-gray-600">Manage your daily tasks and stay organized.</p>
        </div>
        <Button className="mt-4 sm:mt-0 flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Add Task</span>
        </Button>
      </motion.div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {taskStats.map((stat, index) => (
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
        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <ApperIcon name="Clock" className="h-5 w-5 text-primary" />
                  <span>Upcoming Tasks</span>
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-surface/50 to-transparent hover:from-surface hover:to-surface/50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-400 hover:text-primary">
                        <ApperIcon name={getStatusIcon(task.status)} className="h-5 w-5" />
                      </button>
                      <div>
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-600">{task.due}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(task.priority)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Task Categories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ApperIcon name="Folder" className="h-5 w-5 text-primary" />
                <span>Task Categories</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sales Follow-ups", count: 8, color: "bg-primary" },
                  { name: "Administrative", count: 5, color: "bg-success" },
                  { name: "Client Meetings", count: 6, color: "bg-warning" },
                  { name: "Documentation", count: 3, color: "bg-info" },
                  { name: "Research", count: 2, color: "bg-accent" },
                ].map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-surface/50 to-transparent hover:from-surface hover:to-surface/50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`} />
                      <span className="font-medium text-gray-900">{category.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{category.count} tasks</span>
                  </motion.div>
                ))}
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
          <ApperIcon name="CheckSquare" className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Task Management Coming Soon</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Comprehensive task management with subtasks, dependencies, time tracking, and team collaboration features.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline">
            <ApperIcon name="List" className="h-4 w-4 mr-2" />
            View All Tasks
          </Button>
          <Button>
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Create Task
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default Tasks