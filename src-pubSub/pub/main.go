package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/gomodule/redigo/redis"
	"github.com/gorilla/mux"
)

var address = "35.239.45.231:6379"
var pass = "B9wALZU3a2qYWDozuE1jorMR8ZRSpKb8k+KNkqkDbyAKqDo12ZDwQ+WG/o84Gscq8RqSQgINsFSk/XuV"

func main() {
	// API
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/index", indexRoute)
	router.HandleFunc("/", publish).Methods("POST")

	log.Fatal(http.ListenAndServe(":3000", router))

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
	c, err := redis.Dial("tcp", address)
	if err != nil {
		fmt.Println("Error")
		log.Println(err)
	} else {
		log.Println("Everything is fine!!!")
	}
	defer c.Close()
	res, err := c.Do("AUTH", pass)
	if err != nil {
		log.Println("Contraseña invalida.")
	}
	log.Println(res)
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
		p1 := persons[size-1]
		p2 := persons[size-2]
		p3 := persons[size-3]
		p4 := persons[size-4]
		p5 := persons[size-5]
		c.Do("SET", "persona1", p1.Name+","+p1.Location+","+strconv.Itoa(p1.Age)+","+p1.Infected_type+","+p1.State)
		c.Do("SET", "persona2", p2.Name+","+p2.Location+","+strconv.Itoa(p2.Age)+","+p2.Infected_type+","+p2.State)
		c.Do("SET", "persona3", p3.Name+","+p3.Location+","+strconv.Itoa(p3.Age)+","+p3.Infected_type+","+p3.State)
		c.Do("SET", "persona4", p4.Name+","+p4.Location+","+strconv.Itoa(p4.Age)+","+p4.Infected_type+","+p4.State)
		c.Do("SET", "persona5", p5.Name+","+p5.Location+","+strconv.Itoa(p5.Age)+","+p5.Infected_type+","+p5.State)
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
	fmt.Fprintf(w, `{"message" : "Recibido de pub redis!"}`)
}

func indexRoute(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Wecome the my GO API pub redis!")
}
