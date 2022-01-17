import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createReservation } from '../utils/api'
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from './reservationForm';

function NewReservation () {
  const history = useHistory()
  const initialForm = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: ''
  }
  const [newReservation, setNewReservation] = useState(initialForm);
  const [error, setError] = useState(null);

  function changeHandler({ target: { name, value } }) {
    setNewReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit (event) {
    event.preventDefault()
    setError(null);

    const response = {
      ...newReservation,
      status: "booked"
    }
    response.people = Number(response.people)
    console.log(response)
    createReservation(response)
    
    .then(() => {
        history.push(`/dashboard?date=${newReservation.reservation_date}`);
    })
    .catch(setError);
  }

  

  return (
    <main>
      <h1>Make a New Reservation</h1>
      <ReservationForm newReservation={newReservation} setNewReservation={setNewReservation} handleSubmit={handleSubmit} changeHandler={changeHandler}/>
      <ErrorAlert error={error} />
    </main>
  )
}
export default NewReservation