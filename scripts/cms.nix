# scripts/cms.nix
{ pkgs }:
let
  inherit (pkgs.pog) pog;
in
pog {
  name = "cms";
  description = "TinaCMS + Astro server management";
  arguments = [
    {
      name = "action";
      description = "Action to perform (start|stop|restart|status|log)";
    }
  ];
  runtimeInputs = with pkgs; [ procps gnugrep nodePackages.pnpm ];
  script = ''
    LOG_FILE="/tmp/senshac-cms.log"
    PROC_PATTERN="tinacms.*dev"
    action="''${1:-start}"

    get_port() {
      grep -oP 'http://localhost:\K[0-9]+' "$LOG_FILE" 2>/dev/null | tail -1 || echo "4321"
    }

    is_running() {
      pgrep -f "$PROC_PATTERN" > /dev/null 2>&1
    }

    do_stop() {
      pkill -f "$PROC_PATTERN" 2>/dev/null || true
      pkill -f "astro.js dev" 2>/dev/null || true
    }

    case "$action" in
      start)
        if is_running; then
          red "CMS server already running"
          exit 1
        fi
        green "Starting TinaCMS with Astro dev server..."
        : > "$LOG_FILE"
        nohup pnpm dev:cms > "$LOG_FILE" 2>&1 &
        sleep 5
        if is_running; then
          port=$(get_port)
          green "CMS server started"
          echo "  Astro: http://localhost:$port/"
          echo "  CMS:   http://localhost:$port/admin/index.html"
        else
          red "Failed to start CMS. Check $LOG_FILE"
          exit 1
        fi
        ;;
      stop)
        if is_running; then
          do_stop
          green "CMS server stopped"
        else
          yellow "CMS server not running"
        fi
        ;;
      restart)
        do_stop
        sleep 1
        green "Starting TinaCMS with Astro dev server..."
        : > "$LOG_FILE"
        nohup pnpm dev:cms > "$LOG_FILE" 2>&1 &
        sleep 5
        if is_running; then
          port=$(get_port)
          green "CMS server started"
          echo "  Astro: http://localhost:$port/"
          echo "  CMS:   http://localhost:$port/admin/index.html"
        else
          red "Failed to start CMS. Check $LOG_FILE"
          exit 1
        fi
        ;;
      status)
        if is_running; then
          port=$(get_port)
          green "CMS server is running"
          echo "  Astro: http://localhost:$port/"
          echo "  CMS:   http://localhost:$port/admin/index.html"
        else
          yellow "CMS server is not running"
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
