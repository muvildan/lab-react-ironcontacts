// src/App.js
import React, { useState } from 'react';
import "./App.css";
import contacts from "./contacts.json";

const remainingContacts = [...contacts];
const initialAgenda = remainingContacts.splice(0, 5);

function App() {

  const[agenda, setAgenda] = useState(initialAgenda);

  const addContact = () => {
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts.splice(randomIndex, 1);
    // const randomContact = remainingContacts[randomIndex] --> This will also return a random contact, but won't modify the original array
    setAgenda(agenda.concat(randomContact));
    // setAgenda([...agenda, randomContact]); --> Another option
  }

  const sortByName = () => {
    const sortedArrName = agenda.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    }).slice();
    setAgenda(sortedArrName)
}

  const sortByPopularity = () => {
    const sortedArrPopu = agenda.sort((a, b) => {
      if (a.popularity > b.popularity) {
        return -1;
      }
      if (a.popularity < b.popularity) {
        return 1;
      }
      return 0;
    }).slice();
    setAgenda(sortedArrPopu)
  }

  const deleteContact = (index) => {
    let newList = agenda.slice()
    newList.splice(index, 1)
    setAgenda(newList)
  }

  return (
  <div className="App">
  <>
  <h1>IRONCONTACTS</h1>
  <button onClick={addContact}>➕Add contact➕</button>
  <button onClick={sortByName}>🌪Name🌪</button>
  <button onClick={sortByPopularity}>🌪Popularity🌪</button>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Delete?</th>
        </tr>
      </thead>
      <tbody>
      {agenda.map((contact, index) => {
        return (
          <tr key={contact.id}>
            <td>
              <img 
              src={contact.pictureUrl} 
              alt={contact.name} 
              width="100px" 
              height="150px"/>
            </td>
            <td>{contact.name}</td>
            <td>{contact.popularity.toFixed(2)}</td>
            <td>{contact.wonOscar && "🏆"}</td>
            <td>{contact.wonEmmy && "🏆"}</td>
            <td><button onClick= { () => deleteContact(index)}>Delete!</button></td>
          </tr>
        )
      })}
      </tbody>
    </table>
    </>
  </div>
  )
}
export default App;
