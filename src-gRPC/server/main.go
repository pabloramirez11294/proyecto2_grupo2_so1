package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"time"

	pb "config"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"google.golang.org/grpc"
)

const (
	port = ":50051"
)

// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedServicioServer
}

// SayHello implements helloworld.GreeterServer
func (s *server) SendData(ctx context.Context, in *pb.DataRequest) (*pb.DataReply, error) {
	log.Print("Recibido")

	//base de datos mongo
	go baseDatos(in.GetData())

	return &pb.DataReply{Message: "Data recibida."}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterServicioServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

func baseDatos(text string) {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://sopes1user:sopes1pass@cluster0.oqfrs.mongodb.net/bd-sopes1-proy2?retryWrites=true&w=majority"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
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

	res, err := database.Collection("data").InsertMany(ctx, ui)

	if err != nil {

		log.Print(err)
	}
	fmt.Printf("Inserted %v documents into data collection!\n", res)

}
