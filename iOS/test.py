from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport
import json
import pprint

headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'eyJraWQiOiJGQjNuNDFxaGk3RnViZmdoR2RLWmdxTkhvaUxPTklcL0Z4dTdKcGU2a3Iwdz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhNDY4NjQxOC1mMGMxLTcwZmMtMTZjYy1hNzVjMTNhOTcxNzMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV8xZWlkQkM0aUQiLCJjbGllbnRfaWQiOiI5M2FpbDU2a2dvcm4yOTRwb2thNzlrN2tvIiwib3JpZ2luX2p0aSI6IjBmMDUzMTRjLTFlOTktNDI2Zi04NmQ1LTBjMTZjMmI1M2YxZSIsImV2ZW50X2lkIjoiZTljMzc0YTktNTM5Yy00OGJjLWFmNTEtMzllYmIzNWEwYjlkIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY5NTU3MzExNSwiZXhwIjoxNjk1NTc5MjM4LCJpYXQiOjE2OTU1NzU2MzgsImp0aSI6ImMzOGIzMGU5LWIzYWEtNDc5MS05NjliLTAwNjdkZjYxMWZlYSIsInVzZXJuYW1lIjoiYTQ2ODY0MTgtZjBjMS03MGZjLTE2Y2MtYTc1YzEzYTk3MTczIn0.SBMGV05_d1bRg3wFoljfP-YFIOv9hTlHzlxo1xRg_3-oDorYg-1QMQWK_utopgIBWVFJ5ZxFmxda5X3mJ8EiT4QQu8zPdrgiwBkcwybjvRKoUKxf3367-kxSHEQrDdn5ORCbfSrYNWxuvor8oXSR7V5z3RerC5xZI7_6ifPTk511EEQBM_rrV1g9K0FVanRFkIxcDp6bme0WjfneaMDyQY0UB5zZxPbp2LSClo_rJo4d7wxqLpY63-NBh-vAQFgwwqWR6Uw_D3syqgOk87i2qm8gTSJvc-cC7r4ltXtbzWKdkQyN6xSIgz-TAiw8FANu_M9aomQTxqhx3lt-m3UfNQ',
}

transport = RequestsHTTPTransport(
  url='https://e5wfyzvcb5ccdkzuldhsflu5kq.appsync-api.us-east-1.amazonaws.com/graphql',
  use_json=True,
  headers=headers,
)
client = Client(transport=transport, fetch_schema_from_transport=True)
query = '''
  query Echo($txt: String) {
    echo(txt: $txt)
  }
'''
params = { 'txt': 'Hello!' }
resp = client.execute(gql(query), variable_values=json.dumps(params))
pprint.pprint(resp)