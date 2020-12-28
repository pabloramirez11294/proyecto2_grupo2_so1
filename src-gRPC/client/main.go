package main

import (
	"context"
	"log"
	"time"

	pb "config"

	"google.golang.org/grpc"
)

const (
	address     = "localhost:50051"
	defaultName = "world"
	text        = `[ 
		{
			"name":"Pablo Mendoza",
			"location":"Guatemala City",
			"age":35,
			"infected_type":"communitary",
			"state": "asymptomatic"
		},
		{
			"name":"Maria Hernandez",
			"location":"Peten",
			"age":15,
			"infected_type":"communitary",
			"state": "asymptomatic"
		},
		{
			"name":"Roberto Torres",
			"location":"Escuintla",
			"age":27,
			"infected_type":"communitary",
			"state": "asymptomatic"
		}
	]`
)

func main() {
	// Set up a connection to the server.
	conn, err := grpc.Dial(address, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewServicioClient(conn)

	// Contact the server and print out its response.
	data := text
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.SendData(ctx, &pb.DataRequest{Data: data})
	if err != nil {
		log.Fatalf("could not send: %v", err)
	}
	log.Printf("Respuesta: %s", r.GetMessage())

}
