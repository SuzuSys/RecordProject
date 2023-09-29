import sys
import re
import json
import yaml
import boto3
from datetime import datetime, timedelta
from botocore.config import Config
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport
from pprint import pprint

with open('credentials.yaml', encoding='utf-8') as f:
  config_dict = yaml.safe_load(f)
expires_date = datetime.strptime(config_dict['expires_date'], '%Y-%m-%d %H:%M:%S')
if expires_date < datetime.now():
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
    config_dict['access_token'] = response['AuthenticationResult']['AccessToken']
    expires_in = response['AuthenticationResult']['ExpiresIn']
    expires_date = datetime.now() + timedelta(seconds = expires_in-120)
    config_dict['expires_date'] = datetime.strftime(expires_date, '%Y-%m-%d %H:%M:%S')
  except client.exceptions.NotAuthorizedException as e:
    print('401: You will need to recovery refresh_token.')
    exit()
  
  # save configuration
  with open('credentials.yaml', 'w') as f:
    yaml.dump(config_dict, f, default_flow_style=False, allow_unicode=True)

else:
  print('402: dssdsdsdsdsdsdsdsds')
  exit()