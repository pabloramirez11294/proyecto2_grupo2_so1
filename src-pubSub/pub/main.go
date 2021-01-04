package main

import (
	"fmt"
	"log"
	"time"

	"github.com/gomodule/redigo/redis"
)

func main() {
	//https://godoc.org/github.com/gomodule/redigo/redis#Pool
	fmt.Println("Hello World")

	c, err := redis.Dial("tcp", "35.226.134.234:6379")
	if err != nil {
		fmt.Println("Error")
		log.Println(err)
	} else {
		log.Println("Everything is fine!!!")
	}
	// defer c.Close()

	/*
		Commands:
		redis-cli
		PUBLISH example test
		SUBSCRIBE example
	*/

	/// This is for Publisher
	c.Do("PUBLISH", "example", "Hola sopes1 "+time.Now().String())
	c.Do("PUBLISH", "example", "Hola sopes2 "+time.Now().String())
	c.Do("PUBLISH", "example", "Hola sopes3 "+time.Now().String())
	c.Do("PUBLISH", "example", "Hola sopes4 "+time.Now().String())
	/// End here

	/// End here

}
