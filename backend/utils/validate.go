package utils

import "regexp"

func validateInput(input string) bool {
	// Updated validation: allow alphanumeric characters and @ . ! ()
	re := regexp.MustCompile(`^[a-zA-Z0-9@.!()]+$`)
	return re.MatchString(input)
}
