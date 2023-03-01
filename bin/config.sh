#!/usr/bin/env bash

MD=`dirname $(readlink -f $0)`
SERVER="https://www2.hs-esslingen.de/~asaramet/"

BASE_LOCAL="<base href=\"..\">"
BASE_INDEX_LOCAL="<base href=\".\">"
BASE_SERVER="<base href=\"${SERVER}\">"

MAIN_LOCAL="const mainFolder = \"../\";"
MAIN_PROD="const mainFolder = \"${SERVER}\";"

prod() {

  find . -iname "*.html" | xargs -L1 sed -i "s|${BASE_LOCAL}|${BASE_SERVER}|g"

  sed -i "s|${BASE_INDEX_LOCAL}|${BASE_SERVER}|g" index.html

  sed -i "s|${MAIN_LOCAL}|${MAIN_PROD}|g" js/main.js
}

localy() {
  sed -i "s|${BASE_SERVER}|${BASE_INDEX_LOCAL}|g" index.html

  find . -iname "*.html" | xargs -L1 sed -i "s|${BASE_SERVER}|${BASE_LOCAL}|g"

  sed -i "s|${MAIN_PROD}|${MAIN_LOCAL}|g" js/main.js
}

help_menu() {
  cat << EOF
  Configure the app for runing it localy on localhost:3000 or production

  OPTIONS:

  -h | --help      Show this message
  -p | --prod      Configure for production on server: ${SERVER}

  EXAMPLES:
    Configure it for runing it locally:

      $ ${0}

    Configure it for runing on ${SERVER}:

      $ ${0} -p
EOF
}

case "${1}" in
  -h | --help)
    help_menu
  ;;

  -p | --prod)
    prod
  ;;


  *)
    localy
  ;;
esac
