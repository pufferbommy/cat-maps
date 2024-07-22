package models

type ToggleLikeData struct {
	CatId string `json:"catId"`
}

type AddCatData struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Image     string  `json:"image"`
}
