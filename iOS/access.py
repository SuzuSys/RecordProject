import boto3
from botocore.config import Config
from warrant.aws_srp import AWSSRP
from pprint import pprint

client = boto3.client(
  'cognito-idp',
  config=Config(region_name='us-east-1', signature_version='v4')
)
aws = AWSSRP(
  username='a4686418-f0c1-70fc-16cc-a75c13a97173',
  password='Redstone0827',
  pool_id='us-east-1_1eidBC4iD',
  client_id='93ail56kgorn294poka79k7ko',
  client=client)

response = aws.authenticate_user()

pprint(response)