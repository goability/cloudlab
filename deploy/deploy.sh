cd ..
npm install
npm run build:s3
aws s3 sync dist s3://site-cloudlab-hogcloud