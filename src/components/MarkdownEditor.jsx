import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

const MarkdownEditor = ({height, defaultValue, onChange}) => {
  return (
    <MdEditor
      style={{ height: height }}
      renderHTML={(text) => mdParser.render(text)}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default MarkdownEditor;
