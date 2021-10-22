import React from 'react'


export const Answer = ({ answer, userId, onDelete }) => (
  
  <aside className="answer">
    {answer.userId === userId &&(
      <button onClick = {() => onDelete(answer.id)}><span role = "img" aria-label = "trash">🗑️</span></button>
    )}
    <div dangerouslySetInnerHTML={{__html:answer.answer}} />
  </aside>
)
