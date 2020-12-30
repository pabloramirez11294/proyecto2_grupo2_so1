from locust import HttpUser, task, between


class User(HttpUser):
    @task(1)
    def users(self):
        response = self.client.post("data", json=
        [
            {
                "name":"Locust",
                "location":"Guatemala City",
                "age":35,
                "infected_type":"communitary",
                "state": "asymptomatic"
            }
        ]    
        )
        json_var = response.json()
        request_id = json_var['title']
 
        print('Post title is ' + request_id)
