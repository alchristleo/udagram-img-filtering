# Udagram Image Filter

## How to start 
```sh
cp .env.example .env
npm i
npm run dev
```

## Try on browser
open http://localhost:8082
add headers in request `X-API-Key` the value should be based on your env
add image_url to be filtered, eg: http://localhost:8082/filteredimage?image_url=https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg

## Deploy with aws elastic beanstalk
```sh
eb init
eb deploy
```

EB URL: http://udagram-alc-dev-dev.us-east-2.elasticbeanstalk.com/filteredimage?image_url=https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg