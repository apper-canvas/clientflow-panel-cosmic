import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const DataTableRow = ({ contact, onView, onEdit, onDelete, index }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-surface/50 hover:to-primary/5 transition-all duration-200"
    >
<td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{contact.company_c}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-900">{contact.contact_person_c}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-600">{contact.email_c}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-600">{contact.phone_c}</div>
      </td>
<td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-600">{formatDate(contact.last_contact_date_c)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-600">{contact.CreatedBy?.Name || 'Unknown'}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end space-x-2">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => onView(contact)}
            className="p-2"
          >
            <ApperIcon name="Eye" className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => onEdit(contact)}
            className="p-2"
          >
            <ApperIcon name="Edit" className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => onDelete(contact.Id)}
            className="p-2 text-error hover:text-error hover:bg-error/10"
          >
            <ApperIcon name="Trash2" className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </motion.tr>
  )
}

export default DataTableRow