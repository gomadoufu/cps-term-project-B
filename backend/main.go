package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	spotifyauth "github.com/zmb3/spotify/v2/auth"

	"golang.org/x/oauth2/clientcredentials"

	"github.com/joho/godotenv"
	"github.com/pusher/pusher-http-go/v5"
	"github.com/zmb3/spotify/v2"
)

func main() {

	// load .env file
	load_env()
	// get token
	ctx, httpClient := auth()
	client := spotify.New(httpClient)

	// search
	results, err := client.Search(ctx, "Shining Lights", spotify.SearchTypeTrack)
	if err != nil {
		log.Fatal(err)
	}

	// print all tracks found in results
	for _, track := range results.Tracks.Tracks {
		fmt.Println(track.Name, track.ID)
		for _, artist := range track.Artists {
			fmt.Println(artist.Name)
		}
	}

	trackId := results.Tracks.Tracks[0].ID

	album := results.Tracks.Tracks[0].Album
	fmt.Println(album.Name, album.ID)

	image := album.Images[0]
	fmt.Println(image.URL)

	feature, err := client.GetAudioFeatures(ctx, trackId)
	if err != nil {
		log.Fatal(err)
	}

	bytes, _ := json.MarshalIndent(feature, "", "  ")
	fmt.Println(string(bytes))

	// Pusher
	pusherClient := pusher.Client{
		AppID:   os.Getenv("PUSHER_APP_ID"),
		Key:     os.Getenv("PUSHER_APP_KEY"),
		Secret:  os.Getenv("PUSHER_APP_SECRET"),
		Cluster: os.Getenv("PUSHER_APP_CLUSTER"),
		Secure:  true,
	}

	jsondata := bytes

	if err := pusherClient.Trigger("my-channel", "my-event", jsondata); err != nil {
		fmt.Println(err)
	}

}

func load_env() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func auth() (context.Context, *http.Client) {
	ctx := context.Background()
	config := &clientcredentials.Config{
		ClientID:     os.Getenv("SPOTIFY_ID"),
		ClientSecret: os.Getenv("SPOTIFY_SECRET"),
		TokenURL:     spotifyauth.TokenURL,
	}
	token, err := config.Token(ctx)
	if err != nil {
		log.Fatalf("couldn't get token: %v", err)
	}

	httpClient := spotifyauth.New().Client(ctx, token)

	return ctx, httpClient
}
