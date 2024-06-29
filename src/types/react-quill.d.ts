declare module 'react-quill' {
  import * as React from 'react';

  type Delta = any;
  type Sources = 'api' | 'user' | 'silent';

  export interface QuillOptions {
    debug?: 'error' | 'warn' | 'log' | boolean;
    modules?: { [moduleName: string]: any };
    placeholder?: string;
    readOnly?: boolean;
    theme?: string;
    bounds?: HTMLElement | string;
    scrollingContainer?: HTMLElement | string | null;
    formats?: string[];
    preserveWhitespace?: boolean;
  }

  export interface QuillEditorProps {
    bounds?: HTMLElement | string;
    children?: React.ReactNode;
    className?: string;
    defaultValue?: string | Delta;
    formats?: string[];
    id?: string;
    modules?: { [moduleName: string]: any };
    onChange?: (content: string, delta: Delta, source: Sources, editor: any) => void;
    onChangeSelection?: (selection: any, source: Sources, editor: any) => void;
    onFocus?: (range: any, source: Sources, editor: any) => void;
    onBlur?: (previousRange: any, source: Sources, editor: any) => void;
    placeholder?: string;
    preserveWhitespace?: boolean;
    readOnly?: boolean;
    scrollingContainer?: HTMLElement | string | null;
    style?: React.CSSProperties;
    tabIndex?: number;
    theme?: string;
    value?: string | Delta;
  }

  class Quill extends React.Component<QuillEditorProps> {
    static Quill: any;
    focus(): void;
    blur(): void;
    getEditor(): any;
  }

  export default Quill;
}
