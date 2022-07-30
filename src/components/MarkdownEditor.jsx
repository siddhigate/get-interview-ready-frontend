import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

const MarkdownEditor = ({ height = "70vh", defaultValue, onChange }) => {
  return (
    <MdEditor
      view={{ menu: true, md: true, html: false }}
      canView={{
        menu: true,
        md: true,
        html: true,
        fullScreen: true,
        hideMenu: true,
      }}
      style={{ height: height }}
      renderHTML={(text) => mdParser.render(text)}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default MarkdownEditor;
