#!/usr/bin/env bash

MD=`dirname $(readlink -f $0)`
SERVER="https://www2.hs-esslingen.de/~asaramet/test/"

prod() {

  find . -iname "*.html" | xargs -L1 sed -i "s|<base href=\"..\">|<base=\"${SERVER}\">|g"

  sed -i "s|<base href=\".\">|<base href=\"${SERVER}\">|g" index.html

  sed -i "s|const mainFolder = \"../\"|const mainFolder = \"${SERVER}\"|g" js/main.js
}

localy() {
  sed -i "s|<base href=\"${SERVER}\">|<base href=\".\">|g" index.html

  find . -iname "*.html" | xargs -L1 sed -i "s|<base=\"${SERVER}\">|<base href=\"..\">|g"

  sed -i "s|const mainFolder = \"${SERVER}\"|const mainFolder = \"../\"|g" js/main.js
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
