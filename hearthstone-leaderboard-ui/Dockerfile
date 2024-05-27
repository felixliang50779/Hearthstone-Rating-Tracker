FROM node:18.17.1 as build

WORKDIR /hearthstone-app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25.2

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /hearthstone-app/build /usr/share/nginx/html