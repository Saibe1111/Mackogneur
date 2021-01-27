DATE=$(date +%d-%m-%Y-%Hh%Mm)

pm2 delete mackogneur
mkdir logs 
pm2 start index.js --name mackogneur -l logs/${DATE}.txt

exit 0
