import { motion, AnimatePresence } from "framer-motion"
import NavigationItem from "@/components/molecules/NavigationItem"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: "BarChart3", path: "/dashboard" },
  { id: "contacts", label: "Contacts", icon: "Users", path: "/contacts" },
  { id: "deals", label: "Deals", icon: "TrendingUp", path: "/deals" },
  { id: "activities", label: "Activities", icon: "Calendar", path: "/activities" },
  { id: "tasks", label: "Tasks", icon: "CheckSquare", path: "/tasks" },
  { id: "leads", label: "Leads", icon: "Target", path: "/leads" },
  { id: "reports", label: "Reports", icon: "PieChart", path: "/reports" },
]

const MobileSidebar = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ClientFlow
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">Professional CRM</p>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <ApperIcon name="X" className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="space-y-3 mb-8">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={onClose}
                  >
                    <NavigationItem item={item} isMobile />
                  </motion.div>
                ))}
              </nav>

            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileSidebar