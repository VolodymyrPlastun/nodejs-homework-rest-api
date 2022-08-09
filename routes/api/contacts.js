const express = require('express')
const {getContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact} = require('../../controller');

const router = express.Router();


router.get('/', getContacts);

router.get('/:id', getContactById)

router.post('/', addContact)

router.delete('/:id', removeContact)

router.put('/:id', updateContact)

router.patch('/:id/favorite', updateStatusContact)

module.exports = router
