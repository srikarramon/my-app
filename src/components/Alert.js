import React from 'react'

function Alert(props) {
  return (
    props.alertText && <div>
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>{props.alertText.type}</strong>: {props.alertText.msg}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>
    </div>
  )
}

export default Alert;
