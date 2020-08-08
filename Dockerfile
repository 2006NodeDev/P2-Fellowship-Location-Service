FROM node:12.18
COPY build P2-Fellowship-Location-Service/build/
COPY node_modules P2-Fellowship-Location-Service/node_modules/
COPY gifted-pulsar-279818-7f17e43c7942.json P2-Fellowship-Location-Service/

CMD npm run deploy --prefix P2-Fellowship-Location-Service/build