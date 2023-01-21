type repl_result =
  | Response of string
  | Eval_error of string
[@@deriving yojson]

module Greeting = struct
  let counter = ref 0
  let greeting() =
    (sprintf "hello, ocaml?! (counter=%d)"
       (incr_and_get counter))
    |> String.to_list
    |&> (function
         | 'h' -> 'H'
         | 'o' -> 'O'
         | 'c' -> 'C'
         | c -> c)
    |> String.of_list
end

module Repl = struct
  let var_x = ref 0
  let eval : string -> repl_result =
    let current_x_as_result() =
      Response (!var_x |> string_of_int) in
    function
    | "var_x" -> (
      current_x_as_result()
    )
    | "bump" -> (
      refupdate var_x (fun x -> x + 1);
      current_x_as_result()
    )
    | "reset" -> (
      var_x := 0;
      current_x_as_result()
    )
    | cmd ->
       (Eval_error (
            sprintf "Unrecognized command: %s" cmd
       ))
end
