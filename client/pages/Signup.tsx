import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Input from '../components/Input';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function submitHandler() {
    fetch('/api/placeholder', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log('ERROR: could not post-fetch: ' + error));
  }

  return (
    <div>
      <Navbar />
      <h2>Sign Up Page</h2>
      <div className="form">
        <h3>Sign Up</h3>
        <Input inputClass={'input-group'} label={'Username: '} setInput={setUsername} />
        <Input inputClass={'input-group'} inputType="password" label={'Password: '} setInput={setPassword} />
        <button className="width-100-perc" onClick={submitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Signup;