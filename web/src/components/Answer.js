import React from 'react'


export const Answer = ({ answer, userId, onDelete }) => (
  
  <aside className="answer">
    {answer.userId === userId &&(
      <button onClick = {() => onDelete(answer.id)}>🗑️</button>
    )}
    <p>{answer.answer}</p>
    
  </aside>
)
