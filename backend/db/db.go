package db

import "github.com/go-redis/redis/v8"

func CreateRedisClient() *redis.Client {
	rdb := redis.NewClient(&redis.Options{
		Addr:     "redis-19274.c10.us-east-1-4.ec2.cloud.redislabs.com:19274",
		Password: "",
		DB:       0,
	})
	return rdb
}
