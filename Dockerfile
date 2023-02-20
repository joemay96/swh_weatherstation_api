FROM node:16

ENV WORKDIR /opt/api
RUN mkdir -p ${WORKDIR}
WORKDIR $WORKDIR
COPY . .

RUN npm install
RUN npm run ts:build
# RUN npm run generate

#ENV GET FROM OUTSIDE
ARG request_db_connection
ARG db_username
ARG db_password

ARG NODE_ENV="production"
ENV DB_CONNECTION = $request_db_connection
ENV DB_USER = $db_username
ENV DB_PW = $db_password

ENV SALT_ROUNDS 10 

ENV PORT 3001
EXPOSE $PORT

CMD ["npm", "run", "start:production"]