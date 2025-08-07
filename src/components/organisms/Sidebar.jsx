import { motion } from "framer-motion"
import NavigationItem from "@/components/molecules/NavigationItem"

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: "BarChart3", path: "/dashboard" },
  { id: "contacts", label: "Contacts", icon: "Users", path: "/contacts" },
  { id: "deals", label: "Deals", icon: "TrendingUp", path: "/deals" },
  { id: "activities", label: "Activities", icon: "Calendar", path: "/activities" },
  { id: "tasks", label: "Tasks", icon: "CheckSquare", path: "/tasks" },
  { id: "leads", label: "Leads", icon: "Target", path: "/leads" },
  { id: "reports", label: "Reports", icon: "PieChart", path: "/reports" },
]

const Sidebar = ({ className }) => {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`w-60 h-screen bg-white border-r border-gray-200 p-6 ${className || ""}`}
    >
      {/* Logo */}
      <div className="mb-8">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          ClientFlow
        </motion.h1>
        <p className="text-sm text-gray-600 mt-1">Professional CRM</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navigationItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 + (index * 0.05) }}
          >
            <NavigationItem item={item} />
          </motion.div>
        ))}
      </nav>

      {/* Bottom section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-auto pt-8"
      >
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-1">Upgrade to Pro</h3>
          <p className="text-sm text-gray-600 mb-3">Unlock advanced features and analytics</p>
          <button className="w-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium py-2 px-3 rounded-md hover:from-primary/90 hover:to-secondary/90 transition-all duration-200">
            Upgrade Now
          </button>
        </div>
      </motion.div>
    </motion.aside>
  )
}

export default Sidebar