rm lambda.zip
cd lambda
npm install
zip -r ../lambda.zip *
cd ..
aws lambda update-function-code --function-name first-trading-skill --zip-file fileb://lambda.zip
