import React, { useState } from 'react';

const UsernameAndPreference = () => {
    const [username, setUsername] = useState('');
    const [preference, setPreference] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Preference:', preference);
    };

    return (
        <div>
            <h1>Username & Preference</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Preference:</label>
                    <div>
                        {['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8'].map((option, index) => (
                            <button
                                type="button"
                                key={index}
                                onClick={() => setPreference(option)}
                                style={{
                                    margin: '5px',
                                    backgroundColor: preference === option ? 'lightblue' : 'white',
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UsernameAndPreference;