import React from "react";
import CodepenEmbed from "./CodepenEmbed";
import CodesandboxEmbed from "./CodesandboxEmbed";
import GistEmbed from "./GistEmbed";
import ReplEmbed from "./ReplEmbed";

const Embed = ({ url }) => {


  console.log("EMBED", url)

  // if codesandbox
  if (url.includes("https://codesandbox.io/")) {
    if (!url.includes("/embed/")) {
      url = url.replace("/s/", "/embed/");
    }
    return <CodesandboxEmbed url={url}></CodesandboxEmbed>;
  }

  // if codepen
  if (url.includes("https://codepen.io/")) {
    if (!url.includes("/embed/")) {
      url = url.replace("/pen/", "/embed/");
    }

    return <CodepenEmbed url={url}></CodepenEmbed>;
  }

  // if repl
  if (url.includes("https://replit.com/")) {
    if (!url.includes("?lite=true")) {
      url = `${url}?lite=true`;
    }

    return <ReplEmbed url={url}></ReplEmbed>;
  }

  // if gist
  if (url.includes("https://gist.github.com")) {
    return <GistEmbed url={url}></GistEmbed>;
  }

  return <div>Sorry, couldn't fetch the embedded solution.</div>;
};

export default Embed;
