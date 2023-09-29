import sys
import re
import json
import yaml

regex = re.compile(r'^RecordProject:')
config_json = regex.sub('', sys.argv[1])
print(config_json)
config_dict = json.loads(config_json)
with open('credentials.yaml', 'w') as f:
    yaml.dump(config_dict, f, default_flow_style=False, allow_unicode=True)
