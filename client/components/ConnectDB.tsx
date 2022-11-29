import * as React from 'react';
import { useState } from 'react';
import Input from './Input';
import { set, get } from 'idb-keyval';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';

function ConnectDB() {
  const [nickname, setNickname] = useState('');
  const [secret, setSecret] = useState('');
  const [uri, setUri] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('5432');
  const [database, setDatabase] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function submitHandler(type: string) {
    let stateData: {
      nickname: string;
      secret: string;
      uri?: string;
      host?: string;
      port?: number;
      database?: string;
      username?: string;
      password?: string;
    };

    if (type === 'uri') {
      stateData = {
        nickname: nickname,
        secret: secret,
        uri: uri,
      };
    } else if (type === 'separate') {
      stateData = {
        nickname: nickname,
        secret: secret,
        uri: `postgres://${username}:${password}@${host}:${port}/${database}`,
        // postgres://n00bs:testallcaps@dbhive.cxjwyi85ug6q.us-east-1.rds.amazonaws.com:5432/postgres
      };
    }

    // Encrypt
    const ciphertext = AES.encrypt(
      JSON.stringify(stateData),
      secret
    ).toString();

    set('dbhive-data', ciphertext)
      .then(() => {
        console.log('IndexedDB set successful');
      })
      .catch((err) => {
        console.log('IndexedDB set failed', err);
      });

    get('dbhive-data')
      .then((data) => {
        console.log('IndexedDB get successful');
        const bytes = AES.decrypt(data, secret);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        fetch('/api/placeholder', {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/JSON',
          },
          body: originalText,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) =>
            console.log('ERROR: could not post-fetch: ' + error)
          );
      })
      .catch((err) => {
        console.log('IndexedDB get failed', err);
      });

    setNickname('');
    setSecret('');
    setUri('');
    setHost('');
    setPort('5432');
    setDatabase('');
    setUsername('');
    setPassword('');
  }

  return (
    <div className="form">
      <h3>Connect DB</h3>
      <Input
        inputClass={'input-group'}
        label={'Nickname: '}
        setInput={setNickname}
      />
      <Input
        inputClass={'input-group'}
        inputType="password"
        label={'Secret: '}
        setInput={setSecret}
      />
      <hr />
      <Input
        inputClass={'input-group'}
        label={'Uri String: '}
        setInput={setUri}
      />
      <button className="width-100-perc" onClick={() => submitHandler('uri')}>
        Submit
      </button>
      <hr />
      <Input inputClass={'input-group'} label={'Host: '} setInput={setHost} />
      <Input
        inputClass={'input-group'}
        label={'Port: '}
        setInput={setPort}
        defaultValue={port}
      />
      <Input
        inputClass={'input-group'}
        label={'Database: '}
        setInput={setDatabase}
      />
      <Input
        inputClass={'input-group'}
        label={'Username: '}
        setInput={setUsername}
      />
      <Input
        inputClass={'input-group'}
        inputType="password"
        label={'Password: '}
        setInput={setPassword}
      />
      <button
        className="width-100-perc"
        onClick={() => submitHandler('separate')}
      >
        Submit
      </button>
    </div>
  );
}

export default ConnectDB;
