package api

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/FabioSebs/bsqgymtracker/backend/db"
	"github.com/gin-gonic/gin"
)

var ctx = context.Background()

var count = 1

func Checkin(c *gin.Context) {
	rdb := db.CreateRedisClient()

	// First time someone checks in for the day
	check, _ := rdb.Exists(ctx, "people").Result()

	if check != 1 {
		rdb.Set(ctx, "people", count, 0)
		c.JSON(http.StatusOK, gin.H{"Message": "Checkedin!"})
		return
	}

	// Handle Max Capacity
	if count == 3 {
		c.JSON(400, gin.H{"Message": "Gym is Full"})
		return
	}

	// Handle Next Checkins
	count++
	rdb.Set(ctx, "people", count, 0)

	c.JSON(http.StatusOK, gin.H{"Message": "Checkedin!"})
}

func Checkout(c *gin.Context) {
	rdb := db.CreateRedisClient()

	// First time someone checks in for the day
	check, err := rdb.Exists(ctx, "people").Result()
	ErrorCheck(err)

	// Handle Checkout at Minimum Capacity
	if check != 1 {
		rdb.Set(ctx, "people", 0, 0)
		c.JSON(400, gin.H{"Message": "you didn't checkin!"})
		return
	}

	if count == 0 {
		rdb.Set(ctx, "people", 0, 0)
		c.JSON(400, gin.H{"Message": "you didn't checkin!"})
		return
	}

	// Handle Next Checkins
	count--
	rdb.Set(ctx, "people", count, 0)

	// Test
	val, _ := rdb.Get(ctx, "people").Result()
	fmt.Println(val)

	c.JSON(http.StatusOK, gin.H{"Message": "Checkedout!"})
}

func Count(c *gin.Context) {
	rdb := db.CreateRedisClient()

	// First time someone checks in for the day
	check, err := rdb.Exists(ctx, "people").Result()
	if err != nil || check != 1 {
		rdb.Set(ctx, "people", 0, 0)
	}

	// If it does exist
	count, err := rdb.Get(ctx, "people").Result()
	ErrorCheck(err)

	// Parse Int
	countInt, err := strconv.Atoi(count)
	ErrorCheck(err)

	// Return JSON
	c.JSON(http.StatusOK, gin.H{"count": countInt})
}

func Cors(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

	if c.Request.Method == "OPTIONS" {
		c.AbortWithStatus(204)
		return
	}

	c.Next()
}

func ErrorCheck(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
