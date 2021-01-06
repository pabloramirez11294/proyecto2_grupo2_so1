package main

import (
	pb "config"
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"google.golang.org/grpc"
)

var address = "go-server-service"

const port = "50050"

func main() {
	// Vatiable de entorno
	/*address := os.Getenv("ADDRESS")
	if len(address) <= 0 {
		address = "go-server-service"
	}*/
	//fmt.Print("\n Direccion: ", address)
	// API
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/index", indexRoute)
	router.HandleFunc("/", postData).Methods("POST")

	log.Fatal(http.ListenAndServe(":3000", router))

}

func postData(w http.ResponseWriter, r *http.Request) {
	// Read data
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Insert a Valid Data")
	}
	//log.Print(string(reqBody), "\n\n\n")
	go sendData(string(reqBody))

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, `{"message" : "Recibido de client gRPC!"}`)
}

func indexRoute(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Wecome the my GO API!")
}

func sendData(data string) {
	// Set up a connection to the server.
	conn, err := grpc.Dial(address+":"+port, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewServicioClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.SendData(ctx, &pb.DataRequest{Data: data})
	if err != nil {
		log.Fatalf("could not send: %v", err)
	}
	log.Printf("Respuesta: %s", r.GetMessage())
}
