package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	AccessToken string             `json:"accessToken"`
	FirstName   string             `json:"firstName"`
	LastName    string             `json:"lastName"`
	Email       string             `json:"email"`
	ProfilePic  string             `json:"profilePic"`
	Description string             `json:"description"`
	Roles       string             `json:"roles"`
}

func (u *User) TableName() string {
	return "users"
}
