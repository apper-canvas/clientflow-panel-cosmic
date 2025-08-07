import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format, isPast, isToday, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import taskService from "@/services/api/taskService";
import { contactService } from "@/services/api/contactService";
import { dealService } from "@/services/api/dealService";
import ApperIcon from "@/components/ApperIcon";
import Deals from "@/components/pages/Deals";
import Contacts from "@/components/pages/Contacts";
import Textarea from "@/components/atoms/Textarea";
import Badge from "@/components/atoms/Badge";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Label from "@/components/atoms/Label";

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [contacts, setContacts] = useState([])
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("due-today")
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [taskForm, setTaskForm] = useState({
    Name: "",
    description_c: "",
    priority_c: "Medium",
    due_date_c: "",
    contact_c: "",
    deal_c: "",
    type_c: "Follow-up Call",
    notes_c: ""
  })
  const [filters, setFilters] = useState({
    priority: "",
    contact: "",
    deal: "",
    type: ""
  })

  useEffect(() => {
    loadInitialData()
  }, [])

  useEffect(() => {
    loadTasks()
  }, [activeTab, filters])

  const loadInitialData = async () => {
    setLoading(true)
    try {
      const [contactsData, dealsData] = await Promise.all([
        contactService.getAll(),
        dealService.getAll()
      ])
      setContacts(contactsData)
      setDeals(dealsData)
    } catch (err) {
      setError("Failed to load initial data")
    }
    setLoading(false)
  }

  const loadTasks = async () => {
    setLoading(true)
    try {
      let tasksData = []
      
switch (activeTab) {
        case "all-tasks":
          tasksData = await taskService.getAll(filters)
          break
        case "due-today":
          tasksData = await taskService.getDueToday()
          break
        case "upcoming":
          tasksData = await taskService.getUpcoming()
          break
        case "completed":
          tasksData = await taskService.getCompleted()
          break
        default:
          tasksData = await taskService.getAll(filters)
      }
      
      setTasks(tasksData)
      setError(null)
    } catch (err) {
      setError("Failed to load tasks")
    }
    setLoading(false)
  }

  const handleCreateTask = async () => {
    if (!taskForm.Name || !taskForm.description_c || !taskForm.due_date_c) {
      toast.error("Please fill in all required fields")
      return
    }

    const result = await taskService.create(taskForm)
    if (result) {
      setShowTaskModal(false)
      resetTaskForm()
      loadTasks()
    }
  }

  const handleUpdateTask = async () => {
    if (!taskForm.Name || !taskForm.description_c || !taskForm.due_date_c) {
      toast.error("Please fill in all required fields")
      return
    }

    const result = await taskService.update(editingTask.Id, taskForm)
    if (result) {
      setShowTaskModal(false)
      setEditingTask(null)
      resetTaskForm()
      loadTasks()
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const result = await taskService.delete(taskId)
      if (result) {
        loadTasks()
      }
    }
  }

  const handleCompleteTask = async (taskId) => {
    const result = await taskService.markComplete(taskId)
    if (result) {
      loadTasks()
    }
  }

  const resetTaskForm = () => {
    setTaskForm({
      Name: "",
      description_c: "",
      priority_c: "Medium",
      due_date_c: "",
      contact_c: "",
      deal_c: "",
      type_c: "Follow-up Call",
      notes_c: ""
    })
  }

  const openEditModal = (task) => {
    setEditingTask(task)
    setTaskForm({
      Name: task.Name,
      description_c: task.description_c,
      priority_c: task.priority_c,
      due_date_c: task.due_date_c ? task.due_date_c.split('T')[0] + 'T' + task.due_date_c.split('T')[1]?.substring(0, 5) || '' : '',
      contact_c: task.contact_c?.Id || "",
      deal_c: task.deal_c?.Id || "",
      type_c: task.type_c,
      notes_c: task.notes_c || ""
    })
    setShowTaskModal(true)
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return <Badge variant="error">High</Badge>
      case "Medium":
        return <Badge variant="warning">Medium</Badge>
      case "Low":
        return <Badge variant="secondary">Low</Badge>
      default:
        return <Badge>Normal</Badge>
    }
  }

  const isOverdue = (dueDate) => {
    if (!dueDate) return false
    try {
      return isPast(parseISO(dueDate)) && !isToday(parseISO(dueDate))
    } catch {
      return false
    }
  }

  const formatDueDate = (dueDate) => {
    if (!dueDate) return "No due date"
    try {
      const date = parseISO(dueDate)
      if (isToday(date)) {
        return `Today ${format(date, 'h:mm a')}`
      }
      return format(date, 'MMM dd, h:mm a')
    } catch {
      return "Invalid date"
    }
  }

  const getTaskStats = () => {
    const allTasks = tasks
    return [
      { label: "Total Tasks", value: allTasks.length, icon: "CheckSquare", color: "from-primary to-secondary" },
      { label: "Completed", value: allTasks.filter(t => t.status_c === "Completed").length, icon: "CheckCircle", color: "from-success to-emerald-600" },
      { label: "Open", value: allTasks.filter(t => t.status_c === "Open").length, icon: "Clock", color: "from-warning to-yellow-600" },
      { label: "Overdue", value: allTasks.filter(t => t.status_c === "Open" && isOverdue(t.due_date_c)).length, icon: "AlertCircle", color: "from-error to-red-600" },
    ]
  }

const tabs = [
    { id: "all-tasks", label: "All Tasks", icon: "List" },
    { id: "due-today", label: "Due Today", icon: "Calendar" },
    { id: "upcoming", label: "Upcoming", icon: "Clock" },
    { id: "completed", label: "Completed", icon: "CheckCircle" }
  ]

  const taskTypes = ["Follow-up Call", "Send Proposal", "Meeting Prep"]
  const priorities = ["High", "Medium", "Low"]

  if (loading && tasks.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
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
        <Button 
          className="mt-4 sm:mt-0 flex items-center space-x-2"
          onClick={() => {
            setEditingTask(null)
            resetTaskForm()
            setShowTaskModal(true)
          }}
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>New Task</span>
        </Button>
      </motion.div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getTaskStats().map((stat, index) => (
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

      {/* Task Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ApperIcon name={tab.icon} className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="priority-filter">Priority</Label>
              <Select
                id="priority-filter"
                value={filters.priority}
                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
              >
                <option value="">All Priorities</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="contact-filter">Contact</Label>
              <Select
                id="contact-filter"
                value={filters.contact}
                onChange={(e) => setFilters(prev => ({ ...prev, contact: e.target.value }))}
              >
                <option value="">All Contacts</option>
                {contacts.map(contact => (
                  <option key={contact.Id} value={contact.Id}>{contact.Name}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="deal-filter">Deal</Label>
              <Select
                id="deal-filter"
                value={filters.deal}
                onChange={(e) => setFilters(prev => ({ ...prev, deal: e.target.value }))}
              >
                <option value="">All Deals</option>
                {deals.map(deal => (
                  <option key={deal.Id} value={deal.Id}>{deal.Name}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="type-filter">Type</Label>
              <Select
                id="type-filter"
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="">All Types</option>
                {taskTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ApperIcon name="List" className="h-5 w-5 text-primary" />
            <span>{tabs.find(tab => tab.id === activeTab)?.label} Tasks ({tasks.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <div className="text-center py-16">
              <ApperIcon name="CheckSquare" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
<p className="text-gray-500 mb-4">
                {activeTab === "all-tasks" && "No tasks found."}
                {activeTab === "due-today" && "No tasks are due today."}
                {activeTab === "upcoming" && "No upcoming tasks found."}
                {activeTab === "completed" && "No completed tasks found."}
              </p>
              <Button onClick={() => setShowTaskModal(true)}>
                <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.Id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    isOverdue(task.due_date_c) && task.status_c === "Open" 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    {task.status_c !== "Completed" && (
                      <button
                        onClick={() => handleCompleteTask(task.Id)}
                        className="text-gray-400 hover:text-green-500 transition-colors"
                      >
                        <ApperIcon name="Circle" className="h-5 w-5" />
                      </button>
                    )}
                    {task.status_c === "Completed" && (
                      <ApperIcon name="CheckCircle" className="h-5 w-5 text-green-500" />
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`font-medium ${task.status_c === "Completed" ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.Name}
                        </h3>
                        {getPriorityBadge(task.priority_c)}
                        {task.type_c && (
                          <Badge variant="secondary">{task.type_c}</Badge>
                        )}
                      </div>
                      
                      <p className={`text-sm mb-2 ${task.status_c === "Completed" ? 'text-gray-400' : 'text-gray-600'}`}>
                        {task.description_c}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <ApperIcon name="Clock" className="h-4 w-4" />
                          <span className={isOverdue(task.due_date_c) && task.status_c === "Open" ? 'text-red-600 font-medium' : ''}>
                            {formatDueDate(task.due_date_c)}
                          </span>
                        </div>
                        
                        {task.contact_c && (
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="User" className="h-4 w-4" />
                            <span>{task.contact_c.Name}</span>
                          </div>
                        )}
                        
                        {task.deal_c && (
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="DollarSign" className="h-4 w-4" />
                            <span>{task.deal_c.Name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(task)}
                    >
                      <ApperIcon name="Edit2" className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTask(task.Id)}
                    >
                      <ApperIcon name="Trash2" className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {editingTask ? "Edit Task" : "Create New Task"}
                </h2>
                <button
                  onClick={() => {
                    setShowTaskModal(false)
                    setEditingTask(null)
                    resetTaskForm()
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ApperIcon name="X" className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="task-name">Task Name *</Label>
                  <Input
                    id="task-name"
                    value={taskForm.Name}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, Name: e.target.value }))}
                    placeholder="Enter task name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="task-description">Description *</Label>
                  <Textarea
                    id="task-description"
                    value={taskForm.description_c}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, description_c: e.target.value }))}
                    placeholder="Enter task description"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="task-priority">Priority</Label>
                    <Select
                      id="task-priority"
                      value={taskForm.priority_c}
                      onChange={(e) => setTaskForm(prev => ({ ...prev, priority_c: e.target.value }))}
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="task-type">Type</Label>
                    <Select
                      id="task-type"
                      value={taskForm.type_c}
                      onChange={(e) => setTaskForm(prev => ({ ...prev, type_c: e.target.value }))}
                    >
                      {taskTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="task-due-date">Due Date & Time *</Label>
                  <Input
                    id="task-due-date"
                    type="datetime-local"
                    value={taskForm.due_date_c}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, due_date_c: e.target.value }))}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="task-contact">Contact</Label>
                    <Select
                      id="task-contact"
                      value={taskForm.contact_c}
                      onChange={(e) => setTaskForm(prev => ({ ...prev, contact_c: e.target.value }))}
                    >
                      <option value="">Select Contact</option>
                      {contacts.map(contact => (
                        <option key={contact.Id} value={contact.Id}>{contact.Name}</option>
                      ))}
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="task-deal">Deal</Label>
                    <Select
                      id="task-deal"
                      value={taskForm.deal_c}
                      onChange={(e) => setTaskForm(prev => ({ ...prev, deal_c: e.target.value }))}
                    >
                      <option value="">Select Deal</option>
                      {deals.map(deal => (
                        <option key={deal.Id} value={deal.Id}>{deal.Name}</option>
                      ))}
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="task-notes">Notes</Label>
                  <Textarea
                    id="task-notes"
                    value={taskForm.notes_c}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, notes_c: e.target.value }))}
                    placeholder="Additional notes"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowTaskModal(false)
                    setEditingTask(null)
                    resetTaskForm()
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={editingTask ? handleUpdateTask : handleCreateTask}>
                  {editingTask ? "Update Task" : "Create Task"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Tasks