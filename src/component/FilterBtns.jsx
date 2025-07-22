import React from 'react'

function FilterBtns({children, className="", ...props}) {
  return (
    <button type='button' className={`filter-buttons ${className}`} {...props}>{children}</button>
  )
}

export default FilterBtns