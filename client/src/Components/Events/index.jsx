import { useState } from 'react';
import axios from 'axios';
import './index.css';

const Events = () => {
    const initialEventData = {
        title: '',
         description: '',
    };

    const [eventData, setEventData] = useState(initialEventData);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(eventData);
        console.log('Testing before Axios call');
        axios({
            method: 'POST',
            url: '/server/events',
            data: eventData,
        })
            .then((res) => {
                console.log(res);
                console.log('we got this far.');
                // Reset the form fields by setting the state to its initial values
                setEventData(initialEventData);
            })
            .catch((error) => {
                console.error('Error during form submission:', error);
            });
    };

    return (
        <form className='inputForm' onSubmit={handleSubmit}>
           

            <div className='form-group'>
                <label>Title:</label>
                {/* Input for 'title' */}
                <input
                    type='text'
                    name='title'
                    value={eventData.title}
                    onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                />
            </div>

            

            

            
            <div className='form-group'>
                <label>Description:</label>
                {/* Textarea for 'description' */}
                <textarea
                    className='description'
                    type='text'
                    name='description'
                    value={eventData.description}
                    onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                />
            </div>

            <button type='submit'>Add Event</button>
        </form>
    );
};

export default Events;
