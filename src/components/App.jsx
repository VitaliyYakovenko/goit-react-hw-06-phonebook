import { nanoid } from 'nanoid'
import css from "./App.module.css"
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import { useSelector, useDispatch } from "react-redux";
import { add, remove, changeFilter } from 'redux/slice';



export function App() { 
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
 
  
  const onAddContact = (data) => {
    const { name, number } = data
    const user = {
      id: 'id ' + nanoid(),
      name,
      number,
    }
    
    dispatch(add(user))
  }
  
 

  
  const onDeleteContact = (contactId) => {
    dispatch(remove(contactId));
  };


  const onChangeFilter = (e) => {
    dispatch(changeFilter(e.target.value))
  };


  const normalizedName =  filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
  contact.name.toLowerCase().includes(normalizedName));
  

  return (
      <div className={css.phonebook}>
         <div className={css.phonebook__inform}>
         <h1 className={css.phonebook__titel}>Phonebook</h1>
        <ContactForm
          contacts={contacts}
          onSubmit={onAddContact}
        />
         </div>
         <h2>Contacts</h2>
         <Filter
         value={filter}
         onChange={onChangeFilter}    
         />
        <ContactList
        contacts={visibleContacts}
        onDelete={onDeleteContact} />   
      </div>
   )
}
