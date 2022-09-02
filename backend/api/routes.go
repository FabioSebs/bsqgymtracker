package api

import "github.com/gin-gonic/gin"

func CreateRoutes(r *gin.Engine) {
	r.Use(Cors)
	r.GET("/checkin", Checkin)
	r.GET("/checkout", Checkout)
	r.GET("/count", Count)
}
