package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type CSClass struct {
	ID       primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string               `json:"name"`
	Queues   []primitive.ObjectID `json:"queues"`
	IsActive bool                 `json:"isActive"`
	Semester string               `json:"semester"`
	Year     int                  `json:"year"`
}

func (c *CSClass) TableName() string {
	return "cs_classes"
}
