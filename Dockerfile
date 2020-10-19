# Stage 1 - the build process
FROM node:12.14.1-alpine3.10 as build-deps
WORKDIR /usr/src/app
COPY client/ ./
RUN npm install
RUN npm run-script build

# Stage 2 - the production environment
FROM nginx:1.18.0-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
