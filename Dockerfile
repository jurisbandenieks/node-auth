FROM node:24-alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install && npm run build
COPY ./dist ./dist
CMD ["npm", "run", "start"]