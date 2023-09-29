import sys
import re
import json
import yaml
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport
import pprint

# Set up configuration
regex = re.compile(r'^RecordConfig:')
config_json = regex.sub('', sys.argv[1])
config_dict = json.loads(config_json)
with open('credentials.yaml', 'w') as f:
  yaml.dump(config_dict, f, default_flow_style=False, allow_unicode=True)

# Verify configuration
headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': config_dict['refresh_token'],
}
transport = RequestsHTTPTransport(
  url=config_dict['appsync_graphqlEndpoint'],
  use_json=True,
  headers=headers,
)
client = Client(transport=transport, fetch_schema_from_transport=True)
query = '''
  query VerifySetup {
    verifySetup
  }
'''
response = client.execute(gql(query))
pprint.pprint(response)
print()
print('Application setup was completed!')