package api

import (
	"github.com/gin-gonic/gin"
)

func StartServer() {
	r := gin.Default()
	CreateRoutes(r)
	r.Run()
}
