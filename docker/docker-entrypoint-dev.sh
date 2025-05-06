# start the webserver
python3 -m http.server 3000 --directory ./public &

# live reloading on port 3001
browser-sync start --proxy localhost:3000 --files './public/*.html,./public/*.css,./public/*.js' --no-ui --no-open --port 3001
