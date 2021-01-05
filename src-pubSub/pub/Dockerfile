FROM golang:1.15.6
RUN apt-get update
RUN apt-get install git
WORKDIR /app
COPY pub .
RUN go get github.com/gomodule/redigo/redis
RUN go get github.com/gorilla/mux
CMD ["./pub"]