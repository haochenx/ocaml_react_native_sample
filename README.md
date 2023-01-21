# OCaml + React Native Sample Project

Prepared for [NGK2023S LT](https://ngk2022s.connpass.com/event/265837/):
talk title **OCaml最高! スマホ開発にも使えちゃう?!**
(translate: *OCaml is the best! It can even be used in mobile app development!*).
- talk slides: [slides/bc03-ngk2023s-haochen.bc03b.pdf](slides/bc03-ngk2023s-haochen.bc03b.pdf)
- event page: https://ngk2022s.connpass.com/event/265837/
- video recording: https://www.youtube.com/watch?v=NEpRBK82KIg#t=2h14m

## Get started
- Install [OPAM](https://opam.ocaml.org/doc/Install.html) and set up a compatible OCaml switch (5.0.0 is tested and recommended)
- Clone this repository `git clone git@github.com:haochenx/ocaml_react_native_sample.git`
- Run `git submodule update --init`
- Run `opam install . vendors/kxclib vendors/prr --deps-only --with-test`
- Run `yarn caml:build`
- Then simply follow React Native's *Setting up the development environment* 
  guide: https://reactnative.dev/docs/environment-setup.
  This guide will work you through
  - setting up Android & iOS development environment
  - launch the application with iOS / Android device
