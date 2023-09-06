import React from 'react'

const ProcessCardMiddle = ({heading,para,imgSrc}) => {
  return (
            <div className="process-card">
              <video autoPlay loop muted playsInline preload="">
                <source src={imgSrc} type="" />
              </video>
              <div className="text-card">
                <h2>{heading}</h2>
                <p>
                 {para}
                </p>
              </div>
            </div>

  )
}

export default ProcessCardMiddle