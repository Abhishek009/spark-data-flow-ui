declare module 'react-syntax-highlighter' {
    import * as React from 'react';
  
    export interface SyntaxHighlighterProps {
      language: string;
      style: any;
      children: string;
    }
  
    export class Prism extends React.Component<SyntaxHighlighterProps, any> {}
  }
  
  declare module 'react-syntax-highlighter/dist/esm/languages/prism/sql' {
    const sql: any;
    export default sql;
  }
  
  declare module 'react-syntax-highlighter/dist/esm/styles/prism/prism-okayay.css' {
    const style: any;
    export default style;
  }

  declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
    const style: any;
    export { style };
  }
  