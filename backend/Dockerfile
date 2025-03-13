# Stage 1: Build the Go app
FROM golang:1.23-alpine as builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy the Go Modules files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum are not changed
RUN go mod tidy

# Copy the source code into the container
COPY . .

# Build the Go app
RUN GOOS=linux GOARCH=amd64 go build -o myapp ./cmd/server

# Stage 2: Create a smaller image for running the app
FROM alpine:latest

# Install necessary certificates and libraries (for Go to work properly)
RUN apk --no-cache add ca-certificates
COPY .env .env

# Set the Current Working Directory inside the container
WORKDIR /root/

# Copy the pre-built binary from the build stage
COPY --from=builder /app/myapp .


# Expose the port the app will run on
EXPOSE 8000

# Command to run the executable
CMD ["./myapp"]
