#! /bin/bash
#deploy

npm ci

npm run db:deploy

npm run build