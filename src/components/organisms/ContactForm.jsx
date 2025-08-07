import { useState } from "react"
import { motion } from "framer-motion"
import FormField from "@/components/molecules/FormField"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Real Estate",
  "Consulting",
  "Media",
  "Government",
  "Non-Profit",
  "Other"
]

const ContactForm = ({ contact, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    company: contact?.company || "",
    contactPerson: contact?.contactPerson || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    industry: contact?.industry || "",
    notes: contact?.notes || "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required"
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "Contact person is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.industry) {
      newErrors.industry = "Industry is required"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Company Name"
          value={formData.company}
          onChange={(e) => handleChange("company", e.target.value)}
          placeholder="Enter company name"
          error={errors.company}
        />

        <FormField
          label="Contact Person"
          value={formData.contactPerson}
          onChange={(e) => handleChange("contactPerson", e.target.value)}
          placeholder="Enter contact person name"
          error={errors.contactPerson}
        />

        <FormField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Enter email address"
          error={errors.email}
        />

        <FormField
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="Enter phone number"
          error={errors.phone}
        />

        <FormField
          label="Industry"
          type="select"
          value={formData.industry}
          onChange={(e) => handleChange("industry", e.target.value)}
          error={errors.industry}
        >
          <option value="">Select an industry</option>
          {industries.map(industry => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </FormField>
      </div>

      <FormField
        label="Notes"
        type="textarea"
        value={formData.notes}
        onChange={(e) => handleChange("notes", e.target.value)}
        placeholder="Enter any additional notes about this contact..."
        className="min-h-[100px]"
      />

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <ApperIcon name="Loader2" className="h-4 w-4" />
              </motion.div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <ApperIcon name="Save" className="h-4 w-4" />
              <span>{contact ? "Update Contact" : "Add Contact"}</span>
            </>
          )}
        </Button>
      </div>
    </motion.form>
  )
}

export default ContactForm