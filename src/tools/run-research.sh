#!/bin/bash
set -euo pipefail
# Robonomics Daily Research Job
# 
# This script runs the daily research job for robot data updates.
# It should be scheduled via crontab to run daily.
#
# Add to crontab (run: crontab -e):
#   0 6 * * * /Users/pranay/Projects/robonomics/tools/run-research.sh >> /Users/pranay/Projects/robonomics/logs/cron.log 2>&1
#
# Or use launchd on macOS (see com.robonomics.research.plist)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
LOG_DIR="$PROJECT_ROOT/logs"

mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/research-$(date +%Y-%m-%d).log"

echo "=== Robonomics Research Job - $(date) ===" >> "$LOG_FILE"

cd "$PROJECT_ROOT"

echo "Running research orchestrator..." >> "$LOG_FILE"
node tools/research.js --cron >> "$LOG_FILE" 2>&1

echo "Research completed at $(date)" >> "$LOG_FILE"
echo "---" >> "$LOG_FILE"
