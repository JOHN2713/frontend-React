# Usar una imagen base de Node para la construcción
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
COPY . ./

RUN npm install

# Eliminar caché de browserslist dentro del contenedor
RUN rm -rf /root/.cache/browserslist

ENV BROWSERSLIST_DISABLE_CACHE=1

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
