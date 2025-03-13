FROM node:latest

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first (better caching)
COPY package.json package-lock.json ./

# Install necessary dependencies
RUN apt-get update && apt-get install -y build-essential rustc cargo

# Install dependencies
RUN npm install

# Now copy the rest of the project files
COPY . .

# Set environment variables
ENV VITE_OAUTH_CLIENT=663622214461-03lmodbrr7r4k79i88rbpg6u65pk6aav.apps.googleusercontent.com
ENV TS_NODE_TRANSPILE_ONLY=true
ENV RUST_BACKTRACE=full
ENV VITE_USE_SWC=false

# Increase Node memory limit to prevent out-of-memory crashes
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the project
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "preview", "--", "--port", "3000", "--host", "0.0.0.0"]
