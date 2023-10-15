import json
import yaml
import package_test

def handler(event, context):
  with open('/opt/config.yaml', 'r') as f:
    print(f)
  print(yaml)
  print(package_test.calc(2, 3))
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }