#!/bin/sh

curl -L https://github.com/holzschu/a-Shell-commands/releases/download/0.1/unzip.wasm -o unzip.wasm
curl -L https://github.com/SuzuSys/RecordProject/archive/refs/heads/main.zip -o RecordProject.zip
. ./unzip.wasm RecordProject.zip
mv RecordProject-main/iOS iOS
rm -rf RecordProject-main
