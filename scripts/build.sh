#! /bin/bash
read -p "build no?" build_no
echo $pwd
mkdir "./buildVersions/build-${build_no}"
yarn   react-scripts build
cp -r build/* "./buildVersions/build-${build_no}"
rm -rf build/*
exit