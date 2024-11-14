package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Roles struct {
	ID        primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	SU        primitive.ObjectID   `json:"su"`
	TA        []primitive.ObjectID `json:"ta"`
	Professor []primitive.ObjectID `json:"admin"`
}

func (r *Roles) TableName() string {
	return "roles"
}
