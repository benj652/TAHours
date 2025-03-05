FROM golang

WORKDIR /app

COPY . .

#COPY go.mod ./
#COPY go.sum ./

RUN go mod tidy

#COPY *.go ./

RUN go run ./cmd/server/main.go