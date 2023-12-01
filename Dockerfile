# fase de construção
FROM --platform=linux/amd64 node:20 as build
WORKDIR /app
RUN npm install -g npm@9.7.2
COPY package.json ./
RUN npm install --ignore-scripts --legacy-peer-deps
RUN npm rebuild
 
COPY . .
RUN npm run build

# fase de produção
FROM --platform=linux/amd64 nginx:stable-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]