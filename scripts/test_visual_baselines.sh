#!/usr/bin/env bash
set -euo pipefail

mode="${1:-test}"
case "$mode" in
  test)
    playwright_command='npm ci && npx playwright test --grep @visual'
    ;;
  --update)
    playwright_command='npm ci && npx playwright test --grep @visual --update-snapshots'
    ;;
  *)
    echo "Verwendung: $0 [--update]" >&2
    exit 2
    ;;
esac

repository_root="$(git rev-parse --show-toplevel)"

docker run --rm --ipc=host \
  --user "$(id -u):$(id -g)" \
  --env NPM_CONFIG_CACHE=/tmp/npm-cache \
  --volume "$repository_root:/work" \
  --workdir /work \
  mcr.microsoft.com/playwright:v1.63.0-noble \
  bash -lc "$playwright_command"
