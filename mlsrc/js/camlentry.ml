module Js = Js_of_ocaml.Js
module PrrJv = Prr.Jv
open Prr
open Kxclib

open App_lib

module FutIo = struct
  [@@@ocaml.warning "-32"]
  type 'x t = 'x Fut.or_error
  open MonadOps(struct
           type 'x t = 'x Fut.t
           let bind m f = Fut.bind m f
           let return x = Fut.return x
         end)
  let bind m f =
    m >>= function
    | Ok x -> f x
    | Error e -> Error e |> return
  let return x = Fut.return (Ok x)
  let return_error x = Fut.return (Error x)
  let check_io x =
    x >>= function
    | Ok x -> return (Ok x)
    | Error e -> return (Error (PrrJv.Error.message e |> Jstr.to_string))
end
module IoOps = MonadOps(FutIo)

module Utils = struct
  [@@@ocaml.warning "-32"]
  external cast : 'a -> 'b = "%identity"
  let js_of_yojson json =
    json |> Yojson.Safe.to_string
    |> Jstr.of_string |> Prr.Json.decode
    |> Result.get_ok
  let yojson_of_js js =
    js |> Prr.Json.encode
    |> Jstr.to_string |> Yojson.Safe.from_string
  let as_json_promise : Yojson.Safe.t FutIo.t -> PrrJv.Promise.t =
    Fut.to_promise ~ok:js_of_yojson
end open Utils

let () =
  let exports = (object%js
        val caml_greeting_ = fun () -> Jstr.of_string (Greeting.greeting())
        val caml_repl_eval_ = fun input ->
          Jstr.to_string input
          |> Repl.eval
          |> yojson_of_repl_result
          |> FutIo.return
          |> as_json_promise
      end) in
  Js.export_all exports;
  Js.export "camlentry" exports
