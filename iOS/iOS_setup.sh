#!/bin/sh
curl -L https://raw.githubusercontent.com/SuzuSys/RecordProject/main/iOS/setup.py -o setup.py
curl -L https://raw.githubusercontent.com/SuzuSys/RecordProject/main/iOS/API.py -o API.py
curl -L https://raw.githubusercontent.com/SuzuSys/RecordProject/main/iOS/requirements.txt -o requirements.txt
pip install -r requirements.txt
python setup.py $1
output=$?
echo $output
echo Hey!!!!
open shortcuts://