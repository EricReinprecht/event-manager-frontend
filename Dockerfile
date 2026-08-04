# ---- Build stage ----
FROM node:20-alpine AS build

# Install a specific Go version (matching your go.mod requirement) instead of apk's outdated package
ARG GO_VERSION=1.26.5
RUN apk add --no-cache curl \
    && curl -fsSL https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz -o /tmp/go.tar.gz \
    && tar -C /usr/local -xzf /tmp/go.tar.gz \
    && rm /tmp/go.tar.gz
ENV PATH="/usr/local/go/bin:${PATH}"

WORKDIR /app/event-manager-frontend

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
ARG VITE_API_PATH
ENV VITE_API_PATH=${VITE_API_PATH}
ARG VITE_GOOGLE_MAPS_API_KEY
ENV VITE_GOOGLE_MAPS_API_KEY=${VITE_GOOGLE_MAPS_API_KEY}

COPY event-manager-frontend/package*.json ./
RUN npm ci

COPY event-manager-frontend/. .
COPY event-manager-microservice-api/. /app/event-manager-microservice-api

RUN npm run build

# ---- Run stage ----
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/event-manager-frontend/dist ./dist
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]