import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";

const DataTableRow = ({ contact, onView, onEdit, onDelete, index }) => {
  const [isEditing, setIsEditing] = useState(null) // null, or field name being edited
  const [formData, setFormData] = useState({})
  const [saveStatus, setSaveStatus] = useState(null) // null, 'saving', 'saved', 'error'
  const [saveTimeout, setSaveTimeout] = useState(null)

  // Initialize form data when contact changes
  useEffect(() => {
    setFormData({
      company_c: contact.company_c || '',
      contact_person_c: contact.contact_person_c || '',
      email_c: contact.email_c || '',
      phone_c: contact.phone_c || '',
      industry_c: contact.industry_c || '',
      notes_c: contact.notes_c || ''
    })
  }, [contact])

  const industries = [
    "Technology", "Healthcare", "Finance", "Education", "Manufacturing",
    "Retail", "Real Estate", "Consulting", "Media", "Government", "Non-Profit", "Other"
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  const handleAutoSave = async (fieldName, value) => {
    // Clear existing timeout
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    // Set new timeout for auto-save
    const timeout = setTimeout(async () => {
      try {
        setSaveStatus('saving')
        const { contactService } = await import('@/services/api/contactService')
        await contactService.update(contact.Id, { [fieldName]: value })
        setSaveStatus('saved')
        toast.success('Contact updated successfully!')
        
        // Clear saved status after 2 seconds
        setTimeout(() => setSaveStatus(null), 2000)
      } catch (error) {
        setSaveStatus('error')
        toast.error('Failed to save changes')
        console.error('Auto-save error:', error)
        
        // Clear error status after 3 seconds
        setTimeout(() => setSaveStatus(null), 3000)
      }
    }, 1000) // Auto-save after 1 second of inactivity

    setSaveTimeout(timeout)
  }

  const handleFieldChange = (fieldName, value) => {
    const updatedData = { ...formData, [fieldName]: value }
    setFormData(updatedData)
    handleAutoSave(fieldName, value)
  }

  const handleKeyPress = (e, fieldName) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSaveImmediate(fieldName)
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  const handleSaveImmediate = async (fieldName) => {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }
    
    try {
      setSaveStatus('saving')
      const { contactService } = await import('@/services/api/contactService')
      await contactService.update(contact.Id, { [fieldName]: formData[fieldName] })
      setSaveStatus('saved')
      setIsEditing(null)
      toast.success('Contact updated successfully!')
      
      setTimeout(() => setSaveStatus(null), 2000)
    } catch (error) {
      setSaveStatus('error')
      toast.error('Failed to save changes')
      console.error('Immediate save error:', error)
      
      setTimeout(() => setSaveStatus(null), 3000)
    }
  }

  const handleCancelEdit = () => {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }
    setIsEditing(null)
    setSaveStatus(null)
    // Restore original data
    setFormData({
      company_c: contact.company_c || '',
      contact_person_c: contact.contact_person_c || '',
      email_c: contact.email_c || '',
      phone_c: contact.phone_c || '',
      industry_c: contact.industry_c || '',
      notes_c: contact.notes_c || ''
    })
  }

  const handleDoubleClick = (fieldName) => {
    setIsEditing(fieldName)
    setSaveStatus(null)
  }

  const renderEditableField = (fieldName, value, type = 'text') => {
    const isCurrentlyEditing = isEditing === fieldName
    const hasStatus = saveStatus && isCurrentlyEditing

    if (isCurrentlyEditing) {
      if (type === 'select') {
        return (
          <div className="flex items-center space-x-2">
            <select
              value={formData[fieldName]}
              onChange={(e) => handleFieldChange(fieldName, e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, fieldName)}
              onBlur={() => setIsEditing(null)}
              autoFocus
              className={`bg-white border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                saveStatus === 'error' ? 'border-error' : 'border-gray-300'
              }`}
            >
              <option value="">Select industry</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
            {hasStatus && (
              <div className="flex items-center">
                {saveStatus === 'saving' && (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <ApperIcon name="Loader2" className="h-3 w-3 text-primary" />
                  </motion.div>
                )}
                {saveStatus === 'saved' && <ApperIcon name="Check" className="h-3 w-3 text-success" />}
                {saveStatus === 'error' && <ApperIcon name="X" className="h-3 w-3 text-error" />}
              </div>
            )}
          </div>
        )
      }

      return (
        <div className="flex items-center space-x-2">
          <input
            type={type}
            value={formData[fieldName]}
            onChange={(e) => handleFieldChange(fieldName, e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, fieldName)}
            onBlur={() => setIsEditing(null)}
            autoFocus
            className={`bg-white border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              saveStatus === 'error' ? 'border-error' : 'border-gray-300'
            }`}
          />
          {hasStatus && (
            <div className="flex items-center">
              {saveStatus === 'saving' && (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <ApperIcon name="Loader2" className="h-3 w-3 text-primary" />
                </motion.div>
              )}
              {saveStatus === 'saved' && <ApperIcon name="Check" className="h-3 w-3 text-success" />}
              {saveStatus === 'error' && <ApperIcon name="X" className="h-3 w-3 text-error" />}
            </div>
          )}
        </div>
      )
    }

    return (
      <div 
        onDoubleClick={() => handleDoubleClick(fieldName)}
        className="cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
        title="Double-click to edit"
      >
        {value || 'Click to add...'}
      </div>
    )
  }
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-surface/50 hover:to-primary/5 transition-all duration-200"
    >
<td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">
          {renderEditableField('company_c', contact.company_c)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-900">
          {renderEditableField('contact_person_c', contact.contact_person_c)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-600">
          {renderEditableField('email_c', contact.email_c, 'email')}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-600">
          {renderEditableField('phone_c', contact.phone_c)}
        </div>
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