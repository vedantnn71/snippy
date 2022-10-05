export interface SnippetState {
  activeSnippet: string | null;
  isReadOnly: boolean;
  setActiveSnippet: (id: string) => void;
  setIsReadOnly: (isReadOnly: boolean) => void;
}

