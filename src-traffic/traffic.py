import time, json

from locust import HttpUser, task, between

data = ""
with open('/home/pabloramirez/Documentos/Sopes1/lab/proy2/traffic.json') as json_file:
        data = json.load(json_file)
        print(data)

class User(HttpUser):    

    wait_time = between(1, 2)

    @task
    def users(self):
        response = self.client.post("/data", json=data)
        json_var = response.json()
        request_id = json_var['message']
 
        #print('Response: ' + request_id)
