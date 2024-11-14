package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Post struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	User     string             `json:"user"`
	Title    string             `json:"title"`
	Body     string             `json:"body"`
	Comments []Comment          `json:"comments"`
}

type Comment struct {
	ID      primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	User    string             `json:"user"`
	Content string             `json:"Content"`
}

func (p *Post) TableName() string {
	return "posts"
}
