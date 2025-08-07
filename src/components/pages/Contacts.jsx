import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { contactService } from "@/services/api/contactService";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import ContactTable from "@/components/organisms/ContactTable";
import ContactDetail from "@/components/organisms/ContactDetail";
import ContactForm from "@/components/organisms/ContactForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";

const Contacts = () => {
  const { globalSearch } = useOutletContext()
  const [contacts, setContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  // UI States
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [editingContact, setEditingContact] = useState(null)

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
    filterContacts()
  }, [contacts, searchTerm, globalSearch])

  const loadContacts = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await contactService.getAll()
      setContacts(data)
    } catch (err) {
      setError("Failed to load contacts. Please try again.")
    } finally {
      setLoading(false)
    }
  }

const filterContacts = () => {
    let filtered = contacts
    const searchQuery = searchTerm || globalSearch || ""

    if (searchQuery) {
      filtered = contacts.filter(contact =>
        contact.company_c?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.contact_person_c?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email_c?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone_c?.includes(searchQuery)
      )
    }

    setFilteredContacts(filtered)
  }

  const handleAddContact = async (formData) => {
    try {
      const newContact = await contactService.create(formData)
      setContacts(prev => [newContact, ...prev])
      setShowForm(false)
      setEditingContact(null)
      toast.success("Contact added successfully!")
    } catch (err) {
      toast.error("Failed to add contact. Please try again.")
      throw err
    }
  }

  const handleEditContact = async (formData) => {
    try {
      const updatedContact = await contactService.update(editingContact.Id, formData)
      setContacts(prev => 
        prev.map(contact => 
          contact.Id === editingContact.Id ? updatedContact : contact
        )
      )
      setShowForm(false)
      setEditingContact(null)
      setSelectedContact(updatedContact)
      toast.success("Contact updated successfully!")
    } catch (err) {
      toast.error("Failed to update contact. Please try again.")
      throw err
    }
  }

  const handleDeleteContact = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await contactService.delete(contactId)
        setContacts(prev => prev.filter(contact => contact.Id !== contactId))
        toast.success("Contact deleted successfully!")
      } catch (err) {
        toast.error("Failed to delete contact. Please try again.")
      }
    }
  }

  const handleViewContact = (contact) => {
    setSelectedContact(contact)
    setShowDetail(true)
  }

const handleEditClick = (contact, mode = 'modal') => {
    if (mode === 'inline') {
      // Handle inline edit completion - update contact in state
      setContacts(prev => 
        prev.map(c => c.Id === contact.Id ? contact : c)
      )
    } else {
      // Handle modal edit
      setEditingContact(contact)
      setShowForm(true)
      setShowDetail(false)
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingContact(null)
  }

  const handleAddNew = () => {
    setEditingContact(null)
    setShowForm(true)
  }

  if (loading) return <Loading message="Loading contacts..." />
  if (error) return <Error message={error} onRetry={loadContacts} />

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contacts</h1>
          <p className="text-gray-600">Manage your customer relationships and contact information.</p>
        </div>
        <Button
          onClick={handleAddNew}
          className="mt-4 sm:mt-0 flex items-center space-x-2"
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Add Contact</span>
        </Button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <SearchBar
          placeholder="Search contacts by company, name, email, or phone..."
          onSearch={setSearchTerm}
          className="flex-1"
        />
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {filteredContacts.length} of {contacts.length} contacts
          </span>
        </div>
      </motion.div>

      {/* Content */}
      {filteredContacts.length === 0 && !loading && (
        <Empty
          title={searchTerm || globalSearch ? "No contacts found" : "No contacts yet"}
          description={
            searchTerm || globalSearch 
              ? "Try adjusting your search terms or clearing filters."
              : "Start building your customer database by adding your first contact."
          }
          actionLabel="Add First Contact"
          onAction={handleAddNew}
          icon="Users"
        />
      )}

      {filteredContacts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ContactTable
            contacts={filteredContacts}
            onView={handleViewContact}
            onEdit={handleEditClick}
            onDelete={handleDeleteContact}
          />
        </motion.div>
      )}

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingContact ? "Edit Contact" : "Add New Contact"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm
                    contact={editingContact}
                    onSubmit={editingContact ? handleEditContact : handleAddContact}
                    onCancel={handleFormCancel}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Detail Modal */}
      <AnimatePresence>
        {showDetail && selectedContact && (
          <ContactDetail
            contact={selectedContact}
            onClose={() => setShowDetail(false)}
            onEdit={handleEditClick}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Contacts