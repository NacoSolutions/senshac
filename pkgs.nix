# pkgs.nix
{ pkgs }:
{
  nodeTools = with pkgs; [
    nodejs_22
    nodePackages.pnpm
    nodePackages.typescript-language-server
  ];

  devTools = with pkgs; [
    nixfmt-rfc-style
    fd
    ripgrep
    wrangler
  ];

  scripts = {
    dev = import ./scripts/dev.nix { inherit pkgs; };
    cms = import ./scripts/cms.nix { inherit pkgs; };
  };
}
