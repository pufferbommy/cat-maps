package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func main() {
	router := gin.Default()

	router.GET("/books", getBooks)
	router.GET("/books/:id", getBook)
	router.POST("/books", addBook)

	router.Run("localhost:8080")
}

type book struct {
	ID    string  `json:"id"`
	Title string  `json:"title"`
	Price float64 `json:"price"`
}

var books = []book{
	{
		ID:    uuid.New().String(),
		Title: "Beloved",
		Price: 333.33,
	},
	{
		ID:    uuid.New().String(),
		Title: "ร้านหนังสือหลอนของคุณมิฟฟลิน",
		Price: 500.55,
	},
	{
		ID:    uuid.New().String(),
		Title: "Atomic Habbits",
		Price: 699.99,
	},
}

func getBooks(c *gin.Context) {
	c.JSON(http.StatusOK, books)
}

func getBook(c *gin.Context) {
	id := c.Param("id")

	for _, book := range books {
		if book.ID == id {
			c.JSON(http.StatusOK, book)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"messsage": "book not found"})
}

func addBook(c *gin.Context) {
	var newBook book

	if err := c.BindJSON(&newBook); err != nil {
		return
	}

	books = append(books, newBook)
	c.JSON(http.StatusCreated, newBook)
}
