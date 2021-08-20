sudo yum update -y
sudo yum install git -y

# install npm, node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

# install postgresql
npm install postgres
# sudo -u postgres psql

# sudo yum install docker -y

git clone https://github.com/j4-3/SDC-JSON-Reviews.git

# Installing docker compose
# sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
# sudo chmod +x /usr/local/bin/docker-compose
# docker-compose version

# Start docker
# sudo service docker start
# sudo usermod -a -G docker ec2-user