import json
import boto3
from time import time

client = boto3.client('timestream-write')

#def prepare_common_attributes():
#  common_attributes = {
#    'Dimensions': [
#      {'Name': 'username', 'Value': COUNTRY},
#      {'Name': 'category', 'Value': CITY},
#      {'Name': 'hostname', 'Value': HOSTNAME}
#    ],
#    'MeasureName': 'utilization',
#    'MeasureValueType': 'MULTI'
#  }
#  return common_attributes

def handler(event, context):
  response = client.write_records(
    DatabaseName='record-suzusys',
    TableName='cycle',
    Records=[
      {
        'Dimensions': [
          {
            'Name': 'forcibly',
            'Value': 'false'
          }
        ],
        'MeasureName': 'action',
        'MeasureValue': 'meal',
        'MeasureValueType': 'VARCHAR',
        'Time': str(int(time())),
        'TimeUnit': 'SECONDS'
      }
    ]
  )
  print('response')
  print(response)
  print('received event:')
  print(event)
  
  return {
    'statusCode': 200,
    'headers': {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': json.dumps('Hello from your new Amplify Python lambda!')
  }