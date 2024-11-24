import React from 'react'

function Cleartext({setText,setResult}) {
    const handleClearText = () => {
        setText('');
        setResult('Cleared text!');
    };
  return (
    <div>
       <button className="btn btn-danger" onClick={handleClearText}>Clear Text</button>
    </div>
  )
}

export default Cleartext;
