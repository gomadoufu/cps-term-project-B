package main

import (
	"log"

	"github.com/gomadoufu/cps-term-project-B/backend/server"
	"github.com/joho/godotenv"
)

func main() {
	// load .env file
	loadEnv()
	// start server
	server.ServerRun()
}

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}
