FROM golang:alpine

WORKDIR /backend

COPY . /backend/

RUN go mod tidy

CMD ["go", "run", "."]