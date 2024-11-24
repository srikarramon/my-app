import React from 'react'

function SpecialChars({text, setText, setResult}) {

    const handleRemoveSpecialChars = () => {
        const updatedText = text.replace(/[^a-zA-Z0-9 ]/g, '');
        setText(updatedText);
       
        setResult('');
        setTimeout(() => {
            setResult('Removed special characters!');
        }, 1000);
        
    };

  return (
    <div>
       <button className="btn btn-secondary" onClick={handleRemoveSpecialChars}>Remove Special Characters</button>
    </div>
  )
}

export default SpecialChars;