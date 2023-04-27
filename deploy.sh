echo "Switching to branch"
git checkout final 
echo "Building app"
npm run build 
echo "Deploying files to server .."
scp -r dist/* root@38.242.215.225:/var/www/vueApp
echo "Done "
