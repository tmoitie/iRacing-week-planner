#!/bin/bash
PHANTOMJS_VERSION=${PHANTOMJS_VERSION:="2.1.1"}
PHANTOMJS_HOST=${PHANTOMJS_HOST:="https://bitbucket.org/ariya/phantomjs/downloads"}

set -e
CACHED_DOWNLOAD="${HOME}/cache/phantomjs-${PHANTOMJS_VERSION}-linux-x86_64.tar.bz2"

# clean old version and setup directories
rm -rf ~/.phantomjs
mkdir ~/.phantomjs
wget --continue --output-document "${CACHED_DOWNLOAD}" "${PHANTOMJS_HOST}/phantomjs-${PHANTOMJS_VERSION}-linux-x86_64.tar.bz2"
tar -xaf "${CACHED_DOWNLOAD}" --strip-components=1 --directory "${HOME}/.phantomjs"

