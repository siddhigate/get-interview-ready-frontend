import React from 'react'

const CodepenEmbed = ({url}) => {

  console.log("HEREE",url)
  return (
    <iframe
        src={url}
        frameBorder="0"
        style={{ width: "100%", minHeight: "60vh" }}
      ></iframe>
  )
}

export default CodepenEmbed