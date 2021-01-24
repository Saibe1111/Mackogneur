DATE=$(date +%d-%m-%Y-%Hh%Mm)

pm2 delete mackogneurTest
mkdir logs 
pm2 start index.js --name mackogneurTest -l logs/${DATE}.txt

exit 0
