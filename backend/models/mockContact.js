const contacts = new Map();

const MockContact = {
  create: async (data) => {
    const id = Date.now().toString();
    const contact = { _id: id, ...data, createdAt: new Date() };
    contacts.set(id, contact);
    console.log('📧 Contact saved:', contact.email);
    return contact;
  }
};

module.exports = MockContact;
