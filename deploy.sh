!/bin/bash

REPOSITORY=/home/ubuntu/vsgg
REPOSITORY_PROD=/home/ubuntu/vsgg

echo "DEPLOYMENT_GROUP_NAME: ${DEPLOYMENT_GROUP_NAME}"

echo "개발 서버 배포"
cd "${REPOSITORY}"

# NVM 환경 설정
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

# 의존성 설치
npm install

# 빌드 실행
npm run build

# PM2 프로세스 확인 및 시작/재시작
pm2 describe vsgg > /dev/null
if [ $? -eq 0 ]; then
    # 실행 중인 경우
    echo "vsgg 프로세스가 실행 중입니다."
    pm2 reload vsgg
else
    # 실행 중이 아닌 경우
    echo "vsgg 프로세스가 실행되지 않았습니다."
    pm2 start npm --name 'vsgg' -- run start
fi