package utils

import (
	"io/ioutil"
	"os"
	"strings"
)

// Helper function to load environment variables from a secret file
func LoadEnvFromSecret(secretPath string) error {
	// Read the secret file
	secretData, err := ioutil.ReadFile(secretPath)
	if err != nil {
		return err
	}

	// Split the secret data into lines (assuming it's in key=value format)
	lines := strings.Split(string(secretData), "\n")
	for _, line := range lines {
		// Skip empty lines
		if line == "" {
			continue
		}

		// Split by '=' to get key and value
		parts := strings.SplitN(line, "=", 2)
		if len(parts) == 2 {
			key := parts[0]
			value := parts[1]
			// Set the environment variable
			os.Setenv(key, value)
		}
	}

	return nil
}
