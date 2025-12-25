# scripts/dev.nix
{ pkgs }:
let
  inherit (pkgs.pog) pog;
in
pog {
  name = "dev";
  description = "TinaCMS + Astro dev server management";
  arguments = [
    {
      name = "action";
      description = "Action to perform (start|stop|restart|status|log)";
    }
  ];
  runtimeInputs = with pkgs; [ procps gnugrep nodePackages.pnpm ];
  script = ''
    LOG_FILE="/tmp/senshac-dev.log"
    PROC_PATTERN="tinacms.*dev"
    action="''${1:-start}"

    get_port() {
      grep -oP 'Local\s+http://localhost:\K[0-9]+' "$LOG_FILE" 2>/dev/null | tail -1 || echo "4321"
    }

    is_running() {
      pgrep -f "$PROC_PATTERN" > /dev/null 2>&1
    }

    do_stop() {
      pkill -f "tinacms.*dev" 2>/dev/null || true
      pkill -f "astro.js dev" 2>/dev/null || true
      pkill -f "node.*astro.*dev" 2>/dev/null || true
      pkill -f "esbuild.*senshac" 2>/dev/null || true
    }

    case "$action" in
      start)
        if is_running; then
          red "Dev server already running"
          exit 1
        fi
        green "Starting TinaCMS + Astro dev server..."
        : > "$LOG_FILE"
        nohup pnpm dev:cms > "$LOG_FILE" 2>&1 &
        sleep 5
        if is_running; then
          port=$(get_port)
          green "Dev server started at http://localhost:$port/"
        else
          red "Failed to start dev server. Check $LOG_FILE"
          exit 1
        fi
        ;;
      stop)
        if is_running; then
          do_stop
          green "Dev server stopped"
        else
          yellow "Dev server not running"
        fi
        ;;
      restart)
        do_stop
        sleep 1
        green "Starting TinaCMS + Astro dev server..."
        : > "$LOG_FILE"
        nohup pnpm dev:cms > "$LOG_FILE" 2>&1 &
        sleep 5
        if is_running; then
          port=$(get_port)
          green "Dev server started at http://localhost:$port/"
        else
          red "Failed to start dev server. Check $LOG_FILE"
          exit 1
        fi
        ;;
      status)
        if is_running; then
          port=$(get_port)
          green "Dev server is running at http://localhost:$port/"
        else
          yellow "Dev server is not running"
        fi
        ;;
      log)
        if [ -f "$LOG_FILE" ]; then
          cat "$LOG_FILE"
        else
          yellow "No log file found"
        fi
        ;;
      *)
        red "Unknown action: $action"
        echo "Valid actions: start, stop, restart, status, log"
        exit 1
        ;;
    esac
  '';
}
