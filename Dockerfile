ARG NODE_VERION=20.16.0

FROM node:${NODE_VERION}-alpine

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV
RUN npm ci
RUN npm install -g prisma

COPY prisma ./prisma/

COPY . ./

# RUN npm run gcloud:run
RUN npx prisma generate
RUN npm run build

ENV PORT=8000
EXPOSE ${PORT}
# CMD [ "npm", "run", "dev" ]
# CMD ["sh", "-c", " npm run gcloud:run && npm run start"]
CMD ["sh", "-c", " npm run start"]
# CMD ["npm", "run", "dev"]
