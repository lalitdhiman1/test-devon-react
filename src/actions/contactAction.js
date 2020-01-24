import * as actionTypes from './index';

export const createContact = (contact) => {
  console.log(contact)
    return {
      type: actionTypes.CREATE_NEW_CONTACT,
      contact: contact
    }
  };

  export const editContact = (contact, id) => {
    console.log(contact)
      return {
        type: actionTypes.EDIT_CONTACT,
        contact: contact,
        id:id
      }
    };
  


export const deleteContact = (id) => {
  console.log(id)
    return {
        type: actionTypes.REMOVE_CONTACT,
        id: id
    }
}