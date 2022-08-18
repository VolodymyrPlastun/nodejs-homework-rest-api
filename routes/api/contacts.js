const express = require('express')
const {getContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact, getContactsByFavorite} = require('../../controller');
const auth = require('../../middlewares/auth');
const router = express.Router();


router.get('/', auth, getContacts);

router.get('/:id', auth, getContactsByFavorite);

router.get('/:id', getContactById)

router.post('/', auth, addContact)

router.delete('/:id', removeContact)

router.put('/:id', updateContact)

router.patch('/:id/favorite', updateStatusContact);

module.exports = router
