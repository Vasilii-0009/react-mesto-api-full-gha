import React from "react";

function WindowWithForm(props) {
  return (
    <div className="window-form">
      <h2 className="window-form__title">{props.title}</h2>
      <form onSubmit={props.onSubmit} className="window-form__form" action="get" >
        {props.children}
      </form>
    </div >
  )
}

export default WindowWithForm