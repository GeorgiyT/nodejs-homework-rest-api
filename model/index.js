const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  try {
    return JSON.parse(await fs.readFile(contactsPath, 'utf8'))
  } catch (error) {
    console.log(error.message)
  }
}

const getContactById = async contactId => {
  try {
    const contacts = await listContacts()
    return contacts.find(el => el.id === contactId) // Зменил ID у первых 10ти на строку, так как есть проблема с разными форматами при поиске.
  } catch (error) {
    console.log(error.message)
  }
}

const addContact = async body => {
  try {
    fs.writeFile(contactsPath, JSON.stringify([...(await listContacts()), { ...body }]))
    return body
  } catch (error) {
    console.log(error.message)
  }
}

const removeContact = async contactId => {
  try {
    const contacts = await listContacts()
    const newContactsArray = contacts.filter(el => el.id !== contactId)
    if (contacts.length !== newContactsArray.length) {
      await fs.writeFile(contactsPath, JSON.stringify(newContactsArray))
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const ind = contacts.indexOf(contacts.find(el => el.id === contactId));
    if (ind === -1) {
      return false
    } else {
      contacts[ind] = { ...contacts[ind], ...body };
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return contacts[ind];
    }
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
