import React from 'react'

 function Countwords({text, setResult}) {
    const handleCountWords = () => {
        const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
        setResult(`Word count: ${wordCount}`);
    };
  return (
    <div>
      <button className="btn btn-info" onClick={handleCountWords}>Count Words</button>
    </div>
  )
}

export default Countwords;
