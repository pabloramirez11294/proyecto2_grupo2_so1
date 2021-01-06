import time, json
from random import randint
from locust import HttpUser, task, between

data = ""
with open('/home/pabloramirez/Documentos/Sopes1/lab/proy2/traffic.json') as json_file:
    data = json.load(json_file)
    print(data)


class User(HttpUser):    

    wait_time = between(5, 10)

    @task
    def users(self):
       # random
        size_json = len(data)
        print(size_json,"\n ***** \n")       
        num_rand = randint(1,size_json)
        print("random: ",num_rand)
        aux_json = []
        cont = 0
        while cont < num_rand:
            num_aux = randint(0,size_json - 1)
            aux_json.append(data[num_aux])
            #print("aux: ",num_aux, ", dato: ",aux_json, "\n")
            cont += 1

        print(aux_json)
        print("\n ***** \n")

        # post
        response = self.client.post("/", json=aux_json)
        json_var = response.json()
        request_id = json_var['message']
 
        print('Response: ' + request_id)
