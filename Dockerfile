FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 5173

CMD ["pnpm", "exec", "serve", "-s", "dist"]

# Build the image:
# docker build -t dx-project:v1.0 .

# Run the container:
# docker run -p 5173:3000 dx-project:v1.0
