# shell.nix
{
  inputs,
  pkgs,
  ...
}:
let
  inherit (pkgs.stdenv.hostPlatform) system;

  inherit (import ./pkgs.nix { inherit pkgs; }) nodeTools devTools scripts;
in
{
  default = inputs.devshell.legacyPackages.${system}.mkShell {
    name = "senshac";

    motd = ''
      ╔═══════════════════════════════════════════════╗
      ║  Senshac Development Shell                    ║
      ╚═══════════════════════════════════════════════╝

      Astro + Alpine.js + HTMX + Hyperscript + UnoCSS

      Quick Commands:
        dev [start|stop|restart|status|log]   Astro dev server
        cms [start|stop|restart|status|log]   TinaCMS + Astro
        build                     Build for production
        preview                   Preview production build
        wrangler                  Test with Cloudflare emulator
        menu                      Show all commands

      Run 'dev --help' or 'cms --help' for options.
    '';

    packages = nodeTools ++ devTools;

    commands = [
      # Server Management
      {
        name = "dev";
        category = "server";
        help = "Astro dev server: dev [start|stop|status|log]";
        command = ''
          ${scripts.dev}/bin/dev "$@"
        '';
      }
      {
        name = "cms";
        category = "server";
        help = "TinaCMS + Astro: cms [start|stop|status|log]";
        command = ''
          ${scripts.cms}/bin/cms "$@"
        '';
      }

      # Development
      {
        name = "build";
        category = "development";
        help = "Build for production";
        command = "pnpm build";
      }
      {
        name = "preview";
        category = "development";
        help = "Preview production build";
        command = "pnpm preview";
      }
      {
        name = "wrangler";
        category = "development";
        help = "Test with Cloudflare Pages emulator (build first)";
        command = "pnpm astro build && pnpm wrangler pages dev ./dist";
      }
      {
        name = "check";
        category = "development";
        help = "Run Astro check";
        command = "pnpm astro check";
      }

      # Quality
      {
        name = "lint";
        category = "quality";
        help = "Run ESLint";
        command = "pnpm lint";
      }
      {
        name = "fmt";
        category = "quality";
        help = "Format code with Prettier";
        command = "pnpm format";
      }
      {
        name = "fmt-check";
        category = "quality";
        help = "Check code formatting";
        command = "pnpm format:check";
      }
      {
        name = "fmt-nix";
        category = "quality";
        help = "Format Nix files";
        command = "nixfmt .";
      }

      # Nix
      {
        name = "flake-check";
        category = "nix";
        help = "Check flake";
        command = "nix flake check";
      }
      {
        name = "flake-show";
        category = "nix";
        help = "Show flake outputs";
        command = "nix flake show";
      }
      {
        name = "update";
        category = "nix";
        help = "Update flake inputs";
        command = "nix flake update";
      }
    ];

    env = [
      {
        name = "NODE_ENV";
        value = "development";
      }
    ];

    devshell.startup.pnpm-install = {
      text = ''
        if [ -f package.json ] && [ ! -d node_modules ]; then
          echo "Installing dependencies..."
          pnpm install
        fi
      '';
      deps = [ ];
    };
  };
}
