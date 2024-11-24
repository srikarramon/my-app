import React from 'react'

function Titlecase({text,setText,setResult}) {
    const handleConvertToTitleCase = () => {
        const updatedText = text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        setText(updatedText);
        setResult('Converted to Title Case!');
    };
  return (
    <div>
      <button className="btn btn-success" onClick={handleConvertToTitleCase}>Convert to Title Case</button>            
    </div>
  )
}

export default Titlecase
