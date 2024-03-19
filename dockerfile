# Etapa de construcción
FROM node:latest as poke
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build --prod

# Etapa de producción
FROM nginx:alpine
COPY --from=poke /app/dist/poke-app /usr/share/nginx/html
