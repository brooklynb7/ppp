# ppp
Photo Per Person

scp -P 9922 -r build/ .nuxt/ static/ package.json brooklyn@121.40.209.81:/home/brooklyn/webwork/ppp

netstat -tunlp

NODE_ENV=production forever start build/main.js
