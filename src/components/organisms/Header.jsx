import { useState } from "react"
import { motion } from "framer-motion"
import SearchBar from "@/components/molecules/SearchBar"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Header = ({ onMobileMenuToggle, onSearch }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMobileMenuToggle}
          className="lg:hidden"
        >
          <ApperIcon name="Menu" className="h-5 w-5" />
        </Button>

        {/* Logo for mobile */}
        <div className="lg:hidden flex items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ClientFlow
          </h1>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <SearchBar 
            placeholder="Search contacts, deals, activities..."
            onSearch={onSearch}
            className="w-full"
          />
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Search button for mobile */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <ApperIcon name="Search" className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <ApperIcon name="Bell" className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-accent to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">3</span>
            </span>
          </Button>

          {/* User menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="h-4 w-4 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium">John Doe</span>
              <ApperIcon name="ChevronDown" className="h-4 w-4" />
            </Button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
              >
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-surface">
                  <ApperIcon name="User" className="h-4 w-4 mr-3" />
                  Profile
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-surface">
                  <ApperIcon name="Settings" className="h-4 w-4 mr-3" />
                  Settings
                </a>
                <hr className="my-2" />
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-surface">
                  <ApperIcon name="LogOut" className="h-4 w-4 mr-3" />
                  Sign out
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header