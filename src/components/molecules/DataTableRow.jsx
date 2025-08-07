import { motion } from "framer-motion"
import { useState } from "react"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import { contactService } from "@/services/api/contactService"

const DataTableRow = ({ contact, onView, onEdit, onDelete, index }) => {
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({})
  const [saving, setSaving] = useState(false)
const handleEdit = () => {
    setEditMode(true)
    setEditData({
      company_c: contact.company_c || '',
      contact_person_c: contact.contact_person_c || '',
      email_c: contact.email_c || '',
      phone_c: contact.phone_c || '',
      industry_c: contact.industry_c || '',
      notes_c: contact.notes_c || ''
    })
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const updatedContact = await contactService.update(contact.Id, editData)
      
      // Update the contact in parent state by calling onEdit with updated data
      if (onEdit && typeof onEdit === 'function') {
        onEdit(updatedContact, 'inline')
      }
      
      setEditMode(false)
      toast.success("Contact updated successfully!")
    } catch (error) {
      toast.error("Failed to update contact. Please try again.")
      console.error("Error updating contact:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditMode(false)
    setEditData({})
  }

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

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
        {editMode ? (
          <Input
            value={editData.company_c}
            onChange={(e) => handleInputChange('company_c', e.target.value)}
            className="w-full"
            placeholder="Company"
          />
        ) : (
          <div className="font-medium text-gray-900">{contact.company_c}</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {editMode ? (
          <Input
            value={editData.contact_person_c}
            onChange={(e) => handleInputChange('contact_person_c', e.target.value)}
            className="w-full"
            placeholder="Contact Person"
          />
        ) : (
          <div className="text-gray-900">{contact.contact_person_c}</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {editMode ? (
          <Input
            type="email"
            value={editData.email_c}
            onChange={(e) => handleInputChange('email_c', e.target.value)}
            className="w-full"
            placeholder="Email"
          />
        ) : (
          <div className="text-gray-600">{contact.email_c}</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {editMode ? (
          <Input
            value={editData.phone_c}
            onChange={(e) => handleInputChange('phone_c', e.target.value)}
            className="w-full"
            placeholder="Phone"
          />
        ) : (
          <div className="text-gray-600">{contact.phone_c}</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-600">{formatDate(contact.last_contact_date_c)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-600">{contact.CreatedBy?.Name || 'Unknown'}</div>
      </td>
<td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end space-x-2">
          {editMode ? (
            <>
              <Button 
                size="sm" 
                variant="default"
                onClick={handleSave}
                disabled={saving}
                className="p-2"
              >
                {saving ? (
                  <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />
                ) : (
                  <ApperIcon name="Check" className="h-4 w-4" />
                )}
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={handleCancel}
                disabled={saving}
                className="p-2"
              >
                <ApperIcon name="X" className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
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
                onClick={handleEdit}
                className="p-2"
              >
                <ApperIcon name="Edit" className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => onEdit(contact, 'modal')}
                className="p-2"
                title="Edit in modal"
              >
                <ApperIcon name="ExternalLink" className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => onDelete(contact.Id)}
                className="p-2 text-error hover:text-error hover:bg-error/10"
              >
                <ApperIcon name="Trash2" className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </td>
    </motion.tr>
  )
}

export default DataTableRow