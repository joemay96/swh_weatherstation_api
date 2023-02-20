FROM node:16

ENV WORKDIR /opt/api
RUN mkdir -p ${WORKDIR}
WORKDIR $WORKDIR
COPY . .

RUN npm install

ARG POCKETBASE_URL="https://pocketbase.sharky.live"
ARG USERNAME="weatherstation"
ARG PASSWORD="peqrzzDkX5vCP3GQ"
ARG PW="secPW123456VerySecureWeatherStationPassword"

ENV PORT 3000
EXPOSE $PORT

CMD ["npm", "run", "start"]