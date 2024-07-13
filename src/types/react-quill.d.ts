declare module 'react-quill' {
  import * as React from 'react';

  interface DeltaOperation {
    insert?: string | { [key: string]: unknown };
    delete?: number;
    retain?: number;
    attributes?: { [key: string]: unknown };
  }

  interface DeltaStatic {
    ops?: DeltaOperation[];
  }

  type Delta = DeltaStatic;
  type Sources = 'api' | 'user' | 'silent';

  interface QuillOptionsStatic {
    debug?: 'error' | 'warn' | 'log' | boolean;
    modules?: { [key: string]: unknown };
    placeholder?: string;
    readOnly?: boolean;
    theme?: string;
    bounds?: HTMLElement | string;
    scrollingContainer?: HTMLElement | string | null;
    formats?: string[];
    preserveWhitespace?: boolean;
  }

  export type QuillOptions = QuillOptionsStatic;

  interface UnprivilegedEditor {
    deleteText(arg0: number, textLength: number): unknown;
    insertEmbed(range: number, image: string, imgUrl: string);
    register(arg0: string, ImageResize: typeof import('quill-image-resize-module-ts')): unknown;
    getLength(): number;
    setSelection(index1: number, index2: number);
    getText(index?: number, length?: number): string;
    getContents(index?: number, length?: number): Delta;
    getSelection(focus?: boolean): Range | null;
    getBounds(index: number, length?: number): BoundsStatic;
  }

  export interface QuillEditorProps {
    bounds?: HTMLElement | string;
    children?: React.ReactNode;
    className?: string;
    defaultValue?: string | Delta;
    formats?: string[];
    id?: string;
    modules?: { [key: string]: unknown };
    onChange?: (content: string, delta: Delta, source: Sources, editor: UnprivilegedEditor) => void;
    onChangeSelection?: (selection: Range, source: Sources, editor: UnprivilegedEditor) => void;
    onFocus?: (range: Range, source: Sources, editor: UnprivilegedEditor) => void;
    onBlur?: (previousRange: Range, source: Sources, editor: UnprivilegedEditor) => void;
    placeholder?: string;
    preserveWhitespace?: boolean;
    readOnly?: boolean;
    scrollingContainer?: HTMLElement | string | null;
    style?: React.CSSProperties;
    tabIndex?: number;
    theme?: string;
    value?: string | Delta;
  }

  interface BoundsStatic {
    left: number;
    top: number;
    height: number;
    width: number;
  }

  interface Range {
    index: number;
    length: number;
  }

  interface QuillStatic {
    find(element: HTMLElement): Quill | null;
    register(path: string, def: unknown, suppressWarning?: boolean): unknown;
    import(path: string): unknown;
    sources: {
      API: 'api';
      SILENT: 'silent';
      USER: 'user';
    };
  }

  class Quill extends React.Component<QuillEditorProps> {
    static Quill: QuillStatic;
    focus(): void;
    blur(): void;
    getEditor(): UnprivilegedEditor;
  }

  export default Quill;
}
