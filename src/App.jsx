import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import Dashboard from "@/components/pages/Dashboard"
import Contacts from "@/components/pages/Contacts"
import Deals from "@/components/pages/Deals"
import Activities from "@/components/pages/Activities"
import Tasks from "@/components/pages/Tasks"
import Leads from "@/components/pages/Leads"
import Reports from "@/components/pages/Reports"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="deals" element={<Deals />} />
            <Route path="activities" element={<Activities />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="leads" element={<Leads />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="z-[9999]"
        />
      </div>
    </BrowserRouter>
  )
}

export default App