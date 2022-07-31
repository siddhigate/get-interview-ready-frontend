import React from 'react'

const GistEmbed = ({url}) => {
  console.log("GIST", url)
  return (
    <iframe
        width="100%"
        height="1000px"
        style={{ minHeight: "60vh", border: "none" }}
        src= {`data:text/html;charset=utf-8,
    <head><base target='_blank' /></head>
    <body><script src='${url}'></script>
    </body>`}
      ></iframe>
  )
}

export default GistEmbed