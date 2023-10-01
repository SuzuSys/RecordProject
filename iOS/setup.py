import sys
import re
import json
import yaml
import boto3
from botocore.config import Config
from datetime import datetime, timedelta
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport
from pprint import pprint

# monkey patch
from botocore.utils import get_encoding_from_headers
from botocore.awsrequest import AWSResponse
old_init = boto3.Session.__init__
def new_init(
  self,
  aws_access_key_id=None,
  aws_secret_access_key=None,
  aws_session_token=None,
  region_name=None,
  botocore_session=None,
  profile_name=None,
):
  @property
  def text(self):
    encoding = get_encoding_from_headers(self.headers)
    if encoding == 'Windows-31J':
      return self.content.decode('cp932')
    elif encoding:
      return self.content.decode(encoding)
    else:
      return self.content.decode('utf-8')
  AWSResponse.text = text
  old_init(
    self,
    aws_access_key_id,
    aws_secret_access_key,
    aws_session_token,
    region_name,
    botocore_session,
    profile_name
  )
boto3.Session.__init__ = new_init

# get config
try:
  regex = re.compile(r'^RecordConfig:')
  config_json = regex.sub('', sys.argv[1])
  config_dict = json.loads(config_json)
except Exception as e:
  exit(e)

# get access token
print('Attempting to create a cognito identity provider instance...')
client = boto3.client(
  'cognito-idp',
  config=Config(region_name=config_dict['project_region'], signature_version='v4')
)
try:
  print('Attempting to sign-in by a refresh token...')
  response = client.initiate_auth(
    AuthFlow='REFRESH_TOKEN',
    ClientId=config_dict['user_pools_web_client_id'],
    AuthParameters={
      'REFRESH_TOKEN': config_dict['refresh_token'],
    },
  )
  config_dict['access_token'] = response['AuthenticationResult']['AccessToken']
  expires_in = response['AuthenticationResult']['ExpiresIn']
  expires_date = datetime.now() + timedelta(seconds = expires_in-120)
  config_dict['expires_date'] = datetime.strftime(expires_date, '%Y-%m-%d %H:%M:%S')
except client.exceptions.NotAuthorizedException as e:
  exit(e)

# save configuration
with open('credentials.yaml', 'w') as f:
  yaml.dump(config_dict, f, default_flow_style=False, allow_unicode=True)

# verify configuration
print('Attempting to run the GraphQL query...')
headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': config_dict['access_token'],
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
try:
  response = client.execute(gql(query))
  pprint(response)
  print()
  print('Application setup was completed!')
  # sys.exit(0)
except Exception as e:
  exit(e)