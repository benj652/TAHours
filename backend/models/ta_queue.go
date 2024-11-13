package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type TAQueue struct {
	ID         primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	TAs        []primitive.ObjectID `json:"TAs"`
	Class      string               `json:"class"`
	Directions string               `json:"directions"`
	Tickets    []primitive.ObjectID `json:"tickets"`
}

func (t *TAQueue) TableName() string {
	return "ta_queues"
}
