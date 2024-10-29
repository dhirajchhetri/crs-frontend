import React from 'react'

function HoverDisplay({displaytext}) {
  return (
    <div className="info-hover">
    {displaytext}
</div>
  )
}

export default React.memo(HoverDisplay)