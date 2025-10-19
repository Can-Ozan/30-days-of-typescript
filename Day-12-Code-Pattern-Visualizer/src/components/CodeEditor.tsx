import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

export const CodeEditor = ({ value, onChange, language }: CodeEditorProps) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };

  return (
    <div className="h-full border rounded-lg overflow-hidden bg-[hsl(var(--editor-bg))] border-[hsl(var(--editor-border))]">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16 },
        }}
      />
    </div>
  );
};
