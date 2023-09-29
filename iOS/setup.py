import sys
import re
import json
import yaml
import boto3
from botocore.config import Config
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport
from pprint import pprint

# get config
try:
  regex = re.compile(r'^RecordConfig:')
  config_json = regex.sub('', sys.argv[1])
  config_dict = json.loads(config_json)
except Exception as e:
  exit(e)

# get access token
client = boto3.client(
  'cognito-idp',
  config=Config(region_name=config_dict['project_region'], signature_version='v4')
)
try:
  response = client.initiate_auth(
    AuthFlow='REFRESH_TOKEN',
    ClientId=config_dict['user_pools_web_client_id'],
    AuthParameters={
      'REFRESH_TOKEN': config_dict['refresh_token'],
    },
  )
  access_token = response['AuthenticationResult']['AccessToken']
  expires_in = response['AuthenticationResult']['ExpiresIn']
  access_date = response['ResponseMetadata']['HTTPHeaders']['date']

  print('---------------- access token response ---------------')
  print('access_token')
  print(access_token)
  print('expires_in')
  print(expires_in)
  print('access_date')
  print(access_date)
  
except client.exceptions.NotAuthorizedException as e:
  exit(e)

# save configuration
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
# response = client.execute(gql(query))
# pprint(response)
# print()
# print('Application setup was completed!')