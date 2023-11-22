const express = require("express");
const router = express.Router();
const contactFunc = require("../controller/contactController.js");
const { validateToken } = require("../middlewares/tokenHandler.js");
router.use(validateToken);
router
  .get("/", contactFunc.getContacts)
  .get("/:id", contactFunc.getContactById)
  .post("/add", contactFunc.createContact)
  .put("/:id", contactFunc.updateContact)
  .delete("/:id", contactFunc.deleteContact);

module.exports = {
  contactRouter: router,
};
