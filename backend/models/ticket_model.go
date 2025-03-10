package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Ticket struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Date        primitive.DateTime `json:"date"`
	Student     primitive.ObjectID `json:"studentId"`
	Problem     string             `json:"problem"`
	Description string             `json:"description"`
	Ta          primitive.ObjectID `json:"taId"`
	TaNote      string             `json:"taNote"`
	Screenshots []string           `json:"screenshots"`
	ProblemType string             `json:"problemtype"`
}

func (u *Ticket) TableName() string {
	return "tickets"
}
