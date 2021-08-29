const { ContactModel } = require('./contacts.model')

const listContacts = async () => {
  try {
    return ContactModel.find();
  } catch (error) {
    console.log(error.message)
  }
}

const getContactById = async contactId => {
  try {
    const contact = ContactModel.findById(contactId);
    if (!contact) {
      return false
    }
    return contact;
  } catch (error) {
    console.log(error.message)
  }
}

const addContact = async body => {
  try {
    return ContactModel.create({ ...body })
  } catch (error) {
    console.log(error.message)
  }
}


const removeContact = async contactId => {
  try {
    const contact = ContactModel.findByIdAndDelete(contactId);
    if (!contact) {
      return false
    }
    return contact
  } catch (error) {
    console.log(error.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contact = ContactModel.findByIdAndUpdate(contactId, body, { new: true });
    if (!contact) {
      return false
    }
    return contact
  } catch (error) {
    console.log(error.message)
  }
}

const updateStatusContact = async (contactId, body) => {
  try {
    const contact = ContactModel.findByIdAndUpdate(contactId, body, { new: true });
    if (!contact) {
      return false
    }
    return contact
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
  updateStatusContact
}
