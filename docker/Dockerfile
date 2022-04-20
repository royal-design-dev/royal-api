FROM node:14.19.0-alpine AS dev

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci --no-optional --ignore-scripts

COPY ./ ./

RUN npm run build

FROM node:14.19.0-alpine AS prod

WORKDIR /home/node/app

COPY --from=dev /home/node/app/package.json ./
COPY --from=dev /home/node/app/node_modules ./node_modules
COPY --from=dev /home/node/app/dist ./dist
COPY --from=dev /home/node/app/ormconfig.js ./ormconfig.js

RUN npm prune --production

CMD [ "node" , 'dist/main']