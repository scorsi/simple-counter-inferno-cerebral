FROM node:9.11-jessie  
WORKDIR /usr/src/app_name
COPY . .
RUN yarn install
EXPOSE 80
CMD yarn run dev
