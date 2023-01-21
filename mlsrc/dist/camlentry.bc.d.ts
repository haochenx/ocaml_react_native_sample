declare module 'orn_sample-camlbundle' {
  export function caml_greeting(): Promise<string>;
  export function caml_repl_eval(input: string): Promise<any>;

  const exported: {
    caml_greeting;
    caml_repl_eval;
  };

  export default exported;
}
