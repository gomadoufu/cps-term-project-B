package use_spotify

import (
	"context"
	"log"
	"net/http"
	"os"

	spotifyauth "github.com/zmb3/spotify/v2/auth"

	"golang.org/x/oauth2/clientcredentials"

	"github.com/zmb3/spotify/v2"
)

type SongFeature struct {
	SongName     string
	Artists      []string
	ImageURL     string
	Danceability float32
	Energy       float32
}

func (sf *SongFeature) New(song string) {

	// get token
	ctx, httpClient := auth()
	client := spotify.New(httpClient)

	// search
	results, err := client.Search(ctx, song, spotify.SearchTypeTrack)
	if err != nil {
		log.Fatal(err)
	}

	track := results.Tracks.Tracks[0]

	sf.SongName = track.Name

	for _, artist := range track.Artists {
		sf.Artists = append(sf.Artists, artist.Name)
	}

	sf.ImageURL = track.Album.Images[0].URL

	feature, err := client.GetAudioFeatures(ctx, track.ID)
	if err != nil {
		log.Fatal(err)
	}
	sf.Danceability = feature[0].Danceability
	sf.Energy = feature[0].Energy
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
