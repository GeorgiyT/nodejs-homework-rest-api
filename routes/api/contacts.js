const express = require('express')
const router = express.Router()
const { v4: uuid } = require('uuid')
const { HttpCode } = require('../../helpers/constants')
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../model/index')
const { validate } = require("../../helpers/validate");
const { createUserSchema, updateUserSchema } = require('../../model/model.schemes')

router.get('/', async (req, res, next) => {
  res.status(HttpCode.OK).json(await listContacts());
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  (await getContactById(contactId))
    ? res.status(HttpCode.OK).json(await getContactById(contactId))
    : res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
})

router.post('/', validate(createUserSchema), async (req, res, next) => {
  const { name, email, phone } = req.body;
  name && email && phone
    ? res.status(HttpCode.CREATED).json(await addContact({ id: uuid(), ...req.body }))
    : res.status(HttpCode.BAD_REQUEST).json({ message: 'Not found' })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  (await removeContact(contactId))
    ? res.status(HttpCode.OK).json({ message: 'Contact deleted' })
    : res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
})

router.put('/:contactId', validate(updateUserSchema), async (req, res, next) => {
  const { contactId } = req.params;

  if (Object.keys(req.body).length === 0) {
    res.status(HttpCode.BAD_REQUEST).json({ message: 'missing fields' })
  } else {
    const result = await updateContact(contactId, req.body)
    result ? res.status(HttpCode.OK).json(result) : res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
  }
})

module.exports = router
