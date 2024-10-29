#! /bin/bash
p= pwd
build_no=$1
echo $p
echo "running deployement"


cd ../../opt/crs/
rm fe
echo "build-${build_no}"
mkdir -p /opt/crs/frontend/build/"build-${build_no}"
cp -r  /opt/crs/frontend/temp/*  /opt/crs/frontend/build/"build-${build_no}"
ln -s /opt/crs/frontend/build/"build-${build_no}" fe
pm2 restart crs-fe
echo "exiting"
exit



