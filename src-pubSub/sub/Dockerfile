FROM golang:1.15.6
RUN apt-get update
RUN apt-get install git
WORKDIR /app
COPY sub .
RUN go get github.com/gomodule/redigo/redis
RUN go get go.mongodb.org/mongo-driver/mongo
RUN go get go.mongodb.org/mongo-driver/mongo/options
CMD ["./sub"]