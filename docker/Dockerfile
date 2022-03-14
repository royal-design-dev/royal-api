FROM node:14.19.0-alpine AS dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --no-optional --ignore-scripts

COPY ./ ./

RUN npm run build

FROM node:14.19.0-alpine AS prod

USER node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --no-optional --ignore-scripts

COPY --from=dev --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=dev --chown=node:node /usr/src/app/dist ./dist
COPY --from=dev --chown=node:node /usr/src/app/ormconfig.js ./ormconfig.json

CMD [ "node" , 'dist/main']
