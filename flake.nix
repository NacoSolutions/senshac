# flake.nix
{
  description = "Senshac - Astro website with Alpine.js, HTMX, Hyperscript, and UnoCSS";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    devshell = {
      url = "github:numtide/devshell";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    pog = {
      url = "github:jpetrucciani/pog";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      devshell,
      pog,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ pog.overlays.${system}.default ];
        };
      in
      {
        devShells = import ./shell.nix {
          inputs = { inherit devshell; };
          inherit pkgs;
        };
      }
    );
}
