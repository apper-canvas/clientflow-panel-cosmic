import contactsData from "@/services/mockData/contacts.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let contacts = [...contactsData]

export const contactService = {
  async getAll() {
    await delay(400)
    return [...contacts]
  },

  async getById(id) {
    await delay(200)
    const contact = contacts.find(c => c.Id === parseInt(id))
    if (!contact) {
      throw new Error("Contact not found")
    }
    return { ...contact }
  },

  async create(contactData) {
    await delay(300)
    const maxId = contacts.length > 0 ? Math.max(...contacts.map(c => c.Id)) : 0
    const newContact = {
      Id: maxId + 1,
      ...contactData,
      lastContactDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    contacts.unshift(newContact)
    return { ...newContact }
  },

  async update(id, contactData) {
    await delay(300)
    const index = contacts.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Contact not found")
    }
    
    const updatedContact = {
      ...contacts[index],
      ...contactData,
      updatedAt: new Date().toISOString()
    }
    
    contacts[index] = updatedContact
    return { ...updatedContact }
  },

  async delete(id) {
    await delay(250)
    const index = contacts.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Contact not found")
    }
    
    contacts.splice(index, 1)
    return true
  }
}