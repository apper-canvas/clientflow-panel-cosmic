import { NavLink } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"

const NavigationItem = ({ item, isMobile = false }) => {
  const baseClasses = isMobile
    ? "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200"
    : "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"

  const activeClasses = "bg-gradient-to-r from-primary to-secondary text-white shadow-md transform scale-105"
  const inactiveClasses = "text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-surface hover:to-gray-50 hover:scale-[1.02]"

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      <ApperIcon name={item.icon} className="h-5 w-5 mr-3" />
      {item.label}
    </NavLink>
  )
}

export default NavigationItem