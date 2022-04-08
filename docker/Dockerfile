FROM node:14.19.0-alpine AS dev

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci --no-optional --ignore-scripts

COPY ./ ./

RUN npm run build

FROM node:14.19.0-alpine AS prod

WORKDIR /home/node/app

RUN npm prune --production

COPY --from=dev --chown=root:root /home/node/app/node_modules ./node_modules
COPY --from=dev --chown=root:root /home/node/app/dist ./dist
COPY --from=dev --chown=root:root /home/node/app/ormconfig.js ./ormconfig.json

CMD [ "node" , 'dist/main']