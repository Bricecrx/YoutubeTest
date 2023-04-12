### Stage 1 : Build ###
FROM node:18 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build --prod

### Stage 2 : Run ###
FROM nginx:1.23.4
COPY --from=build /app/dist /usr/share/nginc/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]