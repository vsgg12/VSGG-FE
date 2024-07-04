#!/bin/bash

REPOSITORY=/home/ubuntu/vsgg
REPOSITORY_PROD=/home/ubuntu/vsgg

echo "DEPLOYMENT_GROUP_NAME: ${DEPLOYMENT_GROUP_NAME}"

  echo "개발 서버 배포"
  cd "${REPOSITORY}"
  sudo npm install
  pm2 describe vsgg > /dev/null
  if [ $? -eq 0 ]; then
	  # 실행 중인 경우
	  echo "til-dev 프로세스가 실행 중입니다."
	  sudo npm run pm2:reload:vsgg
  else
  	# 실행 중이 아닌 경우
  	echo "til-dev 프로세스가 실행되지 않았습니다."
	  sudo npm run pm2:start:vsgg
  fi
fi