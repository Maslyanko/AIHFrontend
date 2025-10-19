#!/bin/sh
set -e
# Render nginx template with env var BACKEND_API
if [ -f /etc/nginx/templates/default.conf.template ]; then
  echo "Rendering nginx config with BACKEND_API=${BACKEND_API}"
  envsubst '$BACKEND_API' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
fi
exec "$@"