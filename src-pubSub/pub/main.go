package main

import (
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
	log.Print(dataJSON, "\n\n\n")
	// Start publish
	c, err := redis.Dial("tcp", "35.226.134.234:6379")
	if err != nil {
		fmt.Println("Error")
		log.Println(err)
	} else {
		log.Println("Everything is fine!!!")
	}
	// defer c.Close()

	// Publisher
	c.Do("PUBLISH", "sopes1", dataJSON)
	// End here

}

func indexRoute(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Wecome the my GO API!")
}
