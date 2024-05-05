import { createContext, useContext } from "react";
import type { Editor } from "@tiptap/react";

import type { FileStateEditor } from "../extensions/files/files";
import type { UploadFilesHandlerArgs } from "../extensions/files/hooks/use-upload-files-handler-editor.ts";

interface Args {
  editor: Editor;
  files: FileStateEditor[];
  uploadFiles: (args: UploadFilesHandlerArgs) => Promise<void>;
}

export const EditorStateContext = createContext<Args>({
  files: [],
  editor: {} as Editor,
  uploadFiles: async () => {}
});

export const useEditorState = () => useContext(EditorStateContext);