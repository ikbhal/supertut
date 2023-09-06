import React from 'react'

const ProcessCard = ({heading,para,imgSrc}) => {
  return (
            <div className="process-card">
              <div className="text-card">
                <h2>{heading}</h2>
                <p>
                 {para}
                </p>
              </div>
              <video autoPlay loop muted playsInline preload="">
                <source src={imgSrc} type="" />
              </video>
            </div>

  )
}

export default ProcessCard