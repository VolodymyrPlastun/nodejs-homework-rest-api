const fs = require('fs/promises');
const path = require('path');
const {v4} = require('uuid');

const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
   const parsedData = JSON.parse(contacts);
    return parsedData;
 } catch (error) {
     console.log(error);
 }
}

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const oneContact = contacts.find(contact => contact.id === id);
    if (!oneContact) {
     return null;
    }
    return oneContact; 
 } catch (error) {
     console.log(error);
 }
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === id);
  if(idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts))
  return contacts[idx]
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {id: v4(), body}
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact;
  } catch (error) {
      console.log(error)
  }
}

const updateContact = async (id, body) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === id);
    if(idx === -1) {
      return null;
    }
    contacts[idx] = {id, ...body};
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts[idx];
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
