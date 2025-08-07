import { useState } from "react"
import { motion } from "framer-motion"
import DataTableRow from "@/components/molecules/DataTableRow"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const ContactTable = ({ contacts, onView, onEdit, onDelete }) => {
  const [sortField, setSortField] = useState("company")
  const [sortDirection, setSortDirection] = useState("asc")

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

const sortedContacts = [...contacts].sort((a, b) => {
    // Map UI field names to database field names
    const fieldMap = {
      company: 'company_c',
      contactPerson: 'contact_person_c', 
      email: 'email_c',
      phone: 'phone_c',
      lastContactDate: 'last_contact_date_c',
      industry: 'industry_c',
      notes: 'notes_c'
    };
    
    const dbField = fieldMap[sortField] || sortField;
    let aValue = a[dbField]
    let bValue = b[dbField]

    if (sortField === "lastContactDate") {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    } else if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  const SortButton = ({ field, children }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(field)}
      className="font-semibold text-gray-700 hover:text-gray-900 flex items-center space-x-1"
    >
      <span>{children}</span>
      <ApperIcon 
        name={
          sortField === field 
            ? (sortDirection === "asc" ? "ChevronUp" : "ChevronDown")
            : "ChevronsUpDown"
        } 
        className="h-4 w-4"
      />
    </Button>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-card border border-gray-200 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-surface to-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                <SortButton field="company">Company</SortButton>
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton field="contactPerson">Contact Person</SortButton>
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton field="email">Email</SortButton>
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton field="phone">Phone</SortButton>
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton field="lastContactDate">Last Contact</SortButton>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="font-semibold text-gray-700">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sortedContacts.map((contact, index) => (
              <DataTableRow
                key={contact.Id}
                contact={contact}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default ContactTable