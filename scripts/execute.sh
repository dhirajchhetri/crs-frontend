#! /bin/bash
echo "running script"

read -p "Enter build no to deploy?" build_no
read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
## clean file
ssh -i ./server_keys/crs-dev.pem levertechno@3.111.115.207 'bash -s' < ./scripts/clean.sh 
#
# Copyin files
scp -r -i  ./server_keys/crs-dev.pem ./buildVersions/build-"${build_no}"/* levertechno@3.111.115.207:../../opt/crs/frontend/temp


ssh -i ./server_keys/crs-dev.pem levertechno@3.111.115.207 'bash -s' < ./scripts/deploy.sh "${build_no}"
fi


