package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gomodule/redigo/redis"
	"github.com/gorilla/mux"
)

func main() {
	// API
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/", indexRoute)
	router.HandleFunc("/publish", publish).Methods("POST")

	log.Fatal(http.ListenAndServe(":4000", router))

}

func publish(w http.ResponseWriter, r *http.Request) {
	// Read data
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Insert a Valid Data")
	}
	dataJSON := string(reqBody)
	//log.Print(dataJSON, "\n\n\n")
	// Start publish
	c, err := redis.Dial("tcp", "35.226.134.234:6379")
	if err != nil {
		fmt.Println("Error")
		log.Println(err)
	} else {
		log.Println("Everything is fine!!!")
	}
	defer c.Close()

	// Publisher
	c.Do("PUBLISH", "sopes1", dataJSON)
	// End here

	// Send list of last five persons
	type Person struct {
		Name          string
		Location      string
		Age           int
		Infected_type string
		State         string
	}
	var persons []Person
	json.Unmarshal([]byte(dataJSON), &persons)
	size := len(persons)
	if size >= 5 {
		c.Do("SET", "persona1", persons[size-1])
		c.Do("SET", "persona2", persons[size-2])
		c.Do("SET", "persona3", persons[size-3])
		c.Do("SET", "persona4", persons[size-4])
		c.Do("SET", "persona5", persons[size-5])
	}
	for _, t := range persons {
		switch {
		case t.Age < 10:
			c.Do("INCR", "cont1")
		case t.Age < 20:
			c.Do("INCR", "cont2")
		case t.Age < 30:
			c.Do("INCR", "cont3")
		case t.Age < 40:
			c.Do("INCR", "cont4")
		case t.Age < 50:
			c.Do("INCR", "cont5")
		case t.Age < 60:
			c.Do("INCR", "cont6")
		case t.Age < 70:
			c.Do("INCR", "cont7")
		case t.Age < 80:
			c.Do("INCR", "cont8")
		case t.Age < 90:
			c.Do("INCR", "cont9")
		default:
			c.Do("INCR", "cont10")
		}
	}
	fmt.Print("Pub Data recibida!!\n")
}

func indexRoute(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Wecome the my GO API!")
}
