package main

import (
	"fmt"
	"log"

	"github.com/gomodule/redigo/redis"
)

func main() {

	c, err := redis.Dial("tcp", "35.226.134.234:6379")
	if err != nil {
		fmt.Println("Error")
		log.Println(err)
	} else {
		log.Println("Everything is fine!!!")
	}
	// defer c.Close()

	// Subscriber
	psc := redis.PubSubConn{Conn: c}
	psc.Subscribe("sopes1")
	for {
		switch v := psc.Receive().(type) {
		case redis.Message:
			fmt.Printf("%s: message: %s\n", v.Channel, v.Data)
		case redis.Subscription:
			fmt.Printf("%s: %s %d\n", v.Channel, v.Kind, v.Count)
		case error:
			fmt.Println(v)
		}
	}
	// End here

}
