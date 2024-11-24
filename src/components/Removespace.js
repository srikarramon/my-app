import React from 'react'

 function Removespace({text, setText, setResult}) {

    const handleRemoveSpaces = () => {
        const updatedText = text.replace(/\s+/g, ' ').trim();
        setText(updatedText);   
        setResult('');
        setTimeout(() => {
            setResult('Removed extra spaces!');  
        }, 1000);
        
    };

  return (
    <div>
       <button className="btn btn-primary" onClick={handleRemoveSpaces}>Remove Extra Spaces</button>
    </div>
  )
}

export default Removespace;
