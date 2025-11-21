const Contact = require('./Contact');

exports.getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

exports.createContact = async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).json(contact);
};

exports.deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
