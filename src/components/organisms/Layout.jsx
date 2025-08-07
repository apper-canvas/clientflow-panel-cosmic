import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "@/components/organisms/Header"
import Sidebar from "@/components/organisms/Sidebar"
import MobileSidebar from "@/components/organisms/MobileSidebar"

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [globalSearch, setGlobalSearch] = useState("")

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleGlobalSearch = (searchTerm) => {
    setGlobalSearch(searchTerm)
  }

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:block fixed top-0 left-0 z-30" />

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-60">
        <Header 
          onMobileMenuToggle={handleMobileMenuToggle}
          onSearch={handleGlobalSearch}
        />
        <main className="flex-1 p-6">
          <Outlet context={{ globalSearch }} />
        </main>
      </div>
    </div>
  )
}

export default Layout