#!/bin/sh

curl -L https://raw.githubusercontent.com/SuzuSys/RecordProject/main/iOS/API.py -o API.py
curl -L https://raw.githubusercontent.com/SuzuSys/RecordProject/main/iOS/requirements.txt -o requirements.txt
pip install -r requirements.txt

