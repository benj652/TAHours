FROM node:23.5

WORKDIR /.

COPY . .

ENV VITE_OAUTH_CLIENT=663622214461-03lmodbrr7r4k79i88rbpg6u65pk6aav.apps.googleusercontent.com

ENV TS_NODE_TRANSPILE_ONLY=true

ENV RUST_BACKTRACE=full

RUN npm install

#RUN npm run build

# don't use this
RUN npm run dev

#EXPOSE 3000

#CMD ["npm", "run", "preview"]