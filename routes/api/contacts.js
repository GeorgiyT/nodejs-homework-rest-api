const express = require('express')
const router = express.Router()
const { HttpCode } = require('../../helpers/constants')
const { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact } = require('../../model/contacts.service')
const { validate } = require("../../helpers/validate");
const { createContactSchema, updateContactSchema, idValidationSchema, updateFavoriteSchema } = require('../../model/contacts.schemes');
const { asyncWrapper } = require('../../helpers/async-wrapper');




router.get('/', asyncWrapper(async (req, res, next) => {
  res.status(HttpCode.OK).json(await listContacts());
}))

router.get('/:contactId', validate(idValidationSchema, "params"), asyncWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  (await getContactById(contactId))
    ? res.status(HttpCode.OK).json(await getContactById(contactId))
    : res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
}))

router.post('/', validate(createContactSchema), asyncWrapper(async (req, res, next) => {
  const { name, email, phone } = req.body;
  name && email && phone
    ? res.status(HttpCode.CREATED).json(await addContact({ ...req.body }))
    : res.status(HttpCode.BAD_REQUEST).json({ message: 'Not found' })
}))

router.delete('/:contactId', validate(idValidationSchema, "params"), asyncWrapper(async (req, res, next) => {
  const { contactId } = req.params;

  const result = await removeContact(contactId);
  (result)
    ? res.status(HttpCode.OK).json({ message: 'Contact deleted' })
    : res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
}))

router.put('/:contactId', validate(idValidationSchema, "params"), validate(updateContactSchema), asyncWrapper(async (req, res, next) => {
  const { contactId } = req.params;

  if (Object.keys(req.body).length === 0) {
    res.status(HttpCode.BAD_REQUEST).json({ message: 'missing fields' })
  } else {
    const result = await updateContact(contactId, req.body)
    result ? res.status(HttpCode.OK).json(result) : res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
  }
}))

router.patch('/:contactId/favorite', validate(idValidationSchema, "params"), validate(updateFavoriteSchema), asyncWrapper(async (req, res, next) => {
  const { contactId } = req.params;

  if (Object.keys(req.body).length === 0) {
    res.status(HttpCode.BAD_REQUEST).json({ message: 'missing field favorite' })
  } else {
    const result = await updateStatusContact(contactId, req.body)
    result ? res.status(HttpCode.OK).json(result) : res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
  }
}))


module.exports = router
