declare module '*.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';