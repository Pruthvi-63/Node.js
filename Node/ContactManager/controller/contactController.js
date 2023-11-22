const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  // console.log(req);
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({
    status: 200,
    contacts: contacts,
    message: "get all contacts",
  });
});

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400).json({ message: "Contact not found" });
    throw new Error("Contact does not exist");
  } else {
    res.status(200).json({
      status: 200,
      contacts: contact,
    });
  }
});

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, contact, email } = req.body;
  if (!name || !contact || !email) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const data = await Contact.create({
    name,
    contact,
    email,
    user_id: req.user.id,
  });

  res.status(201).json(data);
});

const deleteContact = asyncHandler(async (req, res) => {
  console.log(`id of delete request:${req.params} ${req.url}`);
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400).json({ message: "Contact not found" });
    throw new Error("Contact does not exist");
  } else {
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403).json({ message: "you dont have permission to do this" });
      throw new Error("Cyou dont have permission to do this");
    }
    const updateContact = await Contact.findByIdAndDelete(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(203).json({
      status: 200,
      message: "contact deleted succesfully",
    });
  }
});

const updateContact = asyncHandler(async (req, res) => {
  console.log(`id of update request:${req.params} ${req.url}`);
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400).json({ message: "Contact not found" });
    throw new Error("Contact does not exist");
  } else {
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403).json({ message: "you dont have permission to do this" });
      throw new Error("you dont have permission to do this");
    }
    const updateContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(203).json({
      status: 200,
      contacts: updateContact,
    });
  }
});

module.exports = {
  getContacts,
  createContact,
  deleteContact,
  updateContact,
  getContactById,
};
