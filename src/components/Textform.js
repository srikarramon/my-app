import React from 'react';
import { useState } from 'react'
import Removespace from './Removespace';
import SpecialChars from './SpecialChars';
import Countwords from './Countwords';
import Cleartext from './Cleartext';
import Titlecase from './Titlecase';


function Textform({ text, setText, placeholder }) {
    const [result, setResult] = useState('');
    return (
        <div className='textUtils'>
        <h1 className="text-primary">Text Utils</h1>
        <p className="text-muted">Enter text below and choose an action to manipulate it.</p>
        <textarea
            className="form-control mb-3"
            rows="3"
            placeholder={placeholder || "Enter your text here..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
        ></textarea>
         <div className="btn-group mb-3" role="group">
                    <Removespace text={text}
                     setText={setText}
                    setResult={setResult}
                     />
                   <SpecialChars text={text}
                    setText={setText}
                    setResult={setResult}
                   />
                   <Countwords text={text}
                    setResult={setResult}
                   />
                     <Cleartext text={text}
                     setText={setText}
                    setResult={setResult}
                   />
                    <Titlecase text={text}
                     setText={setText}
                    setResult={setResult}
                   />
                    </div>

                {/* Output Area */}
                <div className="output">
                    <h4>Output:</h4>
                    <p className="text-success">{result}</p>
                </div>
        
        </div>
    );
}

export default Textform;