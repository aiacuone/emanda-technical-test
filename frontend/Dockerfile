# Stage 1: Development and build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# The development server will be started by docker-compose
CMD ["npm", "run", "dev"]

# Stage 2: Production stage (not used in development)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
