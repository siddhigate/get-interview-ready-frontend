import React from "react";

const Embed = () => {
  return (
    <div>
      <h1>Embed</h1>
      <iframe
        width="100%"
        height="1000px"
        style={{ minHeight: "50vh", border: "none" }}
        src="data:text/html;charset=utf-8,
    <head><base target='_blank' /></head>
    <body><script src='https://gist.github.com/Albert-W/e37d1c4fa30c430c37d7b1b1fe9b60d8.js'></script>
    </body>"
      ></iframe>

      <iframe
        src="https://codesandbox.io/embed/emojiinterpreterprac-6jv72"
        frameborder="0"
        style={{ width: "100%", minHeight: "50vh" }}
      ></iframe>
      <iframe
        src="https://codepen.io/chriscoyier/embed/gfdDu"
        frameborder="0"
        style={{ width: "100%", minHeight: "50vh" }}
      ></iframe>
      <iframe
        frameborder="0"
        width="100%"
        style={{ height: "60vh" }}
        src="https://replit.com/@SiddhiCodes/Floor-of-a-number?lite=true"
      ></iframe>
    </div>
  );
};

export default Embed;
