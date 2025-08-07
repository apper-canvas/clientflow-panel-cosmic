import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Textarea from "@/components/atoms/Textarea"
import ApperIcon from "@/components/ApperIcon"

const ContactDetail = ({ contact, onClose, onEdit }) => {
const [notes, setNotes] = useState(contact.notes_c || "")
  const [isEditingNotes, setIsEditingNotes] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const handleSaveNotes = () => {
    // In a real app, this would update the contact via API
    setIsEditingNotes(false)
  }

const contactInfo = [
    { label: "Email", value: contact.email_c, icon: "Mail" },
    { label: "Phone", value: contact.phone_c, icon: "Phone" },
    { label: "Industry", value: contact.industry_c, icon: "Building" },
    { label: "Last Contact", value: formatDate(contact.last_contact_date_c), icon: "Calendar" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
<div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{contact.company_c}</h2>
            <p className="text-lg text-gray-600">{contact.contact_person_c}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(contact)}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Edit" className="h-4 w-4" />
              <span>Edit</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ApperIcon name="X" className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ApperIcon name="User" className="h-5 w-5 text-primary" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-surface to-gray-50"
                  >
                    <div className="bg-primary/10 p-2 rounded-full">
                      <ApperIcon name={info.icon} className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{info.label}</p>
                      <p className="text-gray-900">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <ApperIcon name="FileText" className="h-5 w-5 text-primary" />
                  <span>Notes</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingNotes(!isEditingNotes)}
                >
                  <ApperIcon name="Edit3" className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isEditingNotes ? (
                <div className="space-y-4">
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this contact..."
                    rows={6}
                  />
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsEditingNotes(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSaveNotes}
                    >
                      Save Notes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-surface/50 to-gray-50/50 p-4 rounded-lg">
                  {notes ? (
                    <p className="text-gray-700 whitespace-pre-wrap">{notes}</p>
                  ) : (
                    <p className="text-gray-500 italic">No notes added yet. Click the edit button to add notes.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activities Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ApperIcon name="Activity" className="h-5 w-5 text-primary" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="bg-gradient-to-r from-surface to-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Clock" className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No recent activities to display</p>
                <p className="text-sm text-gray-400 mt-1">Activity tracking will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ContactDetail