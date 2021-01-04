package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/gomodule/redigo/redis"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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
			//fmt.Printf("%s: message: %s\n", v.Channel, v.Data)
			fmt.Print("¡¡Data recibida!!")
			go baseDatos(string(v.Data))
		case redis.Subscription:
			fmt.Printf("%s: %s %d\n", v.Channel, v.Kind, v.Count)
		case error:
			fmt.Println(v)
		}
	}
	// End here

}

func baseDatos(text string) {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://sopes1user:sopes1pass@cluster0.oqfrs.mongodb.net/bd-sopes1-proy2?retryWrites=true&w=majority"))
	if err != nil {
		log.Print(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		log.Print(err)
	}
	defer client.Disconnect(ctx)

	database := client.Database("bd-sopes1-proy2")

	type Person struct {
		Name          string
		Location      string
		Age           int
		Infected_type string
		State         string
	}
	dataJSON := text
	var persons []Person
	json.Unmarshal([]byte(dataJSON), &persons)

	//convertir a []interface
	var ui []interface{}
	for _, t := range persons {
		ui = append(ui, t)
	}

	res, err := database.Collection("infectados").InsertMany(ctx, ui)

	if err != nil {

		log.Print(err)
	}
	fmt.Printf("Inserted %v documents into data collection!\n", res)

}
