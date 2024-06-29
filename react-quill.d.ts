declare module 'react-quill' {
  import React from 'react';

  interface QuillToolbarProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
  }

  export interface ReactQuillProps {
    id?: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    tabIndex?: number;
    readOnly?: boolean;
    theme?: string;
    style?: React.CSSProperties;
    className?: string;
    onChange?: (value: string, delta: any, source: any, editor: any) => void;
    onChangeSelection?: (selection: any, source: any, editor: any) => void;
    onFocus?: (range: any, source: any, editor: any) => void;
    onBlur?: (previousRange: any, source: any, editor: any) => void;
    modules?: {
      [key: string]: any;
    };
    formats?: string[];
    bounds?: string | HTMLElement;
    scrollingContainer?: string | HTMLElement;
    preserveWhitespace?: boolean;
  }

  class QuillToolbar extends React.Component<QuillToolbarProps> {}

  class ReactQuill extends React.Component<ReactQuillProps> {
    focus: () => void;
    blur: () => void;
    getEditor: () => any;
  }

  export default ReactQuill;
}
