# Makefile to initialize the swarm, manage secrets, and deploy the stack

# Variables
DOCKER_COMPOSE = docker compose
DOCKER_SWARM = docker swarm
DOCKER_SECRET = docker secret
DOCKER_STACK = docker stack
STACK_NAME = tahours
TESTMODE ?= false
NOCACHE ?= false

# Targets
.PHONY: all build swarm-init remove-secrets create-secrets deploy prune run destroy

# Default target
all: build swarm-init prune remove-secrets create-secrets  deploy

# Build Docker images without cache
build:
	@if [ "$(NOCACHE)" = "true" ]; then \
		echo "Building images without cache..."; \
		$(DOCKER_COMPOSE) build --no-cache; \
	else \
		echo "Building images with cache..."; \
		$(DOCKER_COMPOSE) build; \
	fi

# Initialize Docker swarm only if not already in a swarm
swarm-init:
	@if ! docker info | grep -q "Swarm: active"; then \
		$(DOCKER_SWARM) init; \
	else \
		echo "Swarm already initialized."; \
	fi

# Remove existing secrets
remove-secrets:
	-$(DOCKER_SECRET) rm mongo_user mongo_pass frontend_env backend_env || true

# Create secrets
create-secrets: remove-secrets
	$(DOCKER_SECRET) create mongo_user secrets/mongo_user.txt
	$(DOCKER_SECRET) create mongo_pass secrets/mongo_pass.txt
	$(DOCKER_SECRET) create frontend_env secrets/frontend_env.txt
	$(DOCKER_SECRET) create backend_env secrets/backend_env.txt

# Deploy the stack with optional detach mode
deploy:
	# Remove existing stack if it exists
	@if $(DOCKER_STACK) ls | grep -q $(STACK_NAME); then \
		$(DOCKER_STACK) rm $(STACK_NAME); \
		sleep 5; \
	fi

ifeq ($(TESTMODE), true)
	$(DOCKER_STACK) deploy -c docker-compose.yml --detach=false $(STACK_NAME)
else
	$(DOCKER_STACK) deploy -c docker-compose.yml $(STACK_NAME)
endif

prune:
	$(DOCKER_COMPOSE) down -v
	$(DOCKER_COMPOSE) down -v

destroy:
	$(DOCKER_STACK) rm $(STACK_NAME)

run:
	$(DOCKER_STACK) deploy -c docker-compose.yml --detach=false $(STACK_NAME)

