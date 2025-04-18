package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// the IsActive boolean might not be needed in the future
type TAQueue struct {
	ID         primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	TAs        []primitive.ObjectID `json:"TAs"`
	IsActive   bool                 `json:"isActive"`
	Class      primitive.ObjectID   `json:"class"`
	Directions string               `json:"directions"`
	Tickets    []primitive.ObjectID `json:"tickets"`
	Date       primitive.DateTime   `json:"date"`
}

func (t *TAQueue) TableName() string {
	return "ta_queues"
}
