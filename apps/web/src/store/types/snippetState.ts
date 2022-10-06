export interface SnippetState {
  activeSnippet: string | null;
  isReadOnly: boolean;
  setActiveSnippet: (id: string | null) => void;
  setIsReadOnly: (isReadOnly: boolean) => void;
}
