#!/bin/bash

echo instala extras da amazon ec2
sudo amazon-linux-extras install -y epel

echo coloca permissoes corretas em home
chmod og+rX /home /home/ec2-user

echo instala node
curl -P ~/ -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh
sudo ~/install.sh
sudo ~/.nvm/nvm.sh
sudo nvm install 14.17.3

echo instala dependencias do projeto
npm install

echo faz o roteamento da porta 80 para a 3000
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000

echo inicia serviço node
sudo cp pucpin-sensores.service /lib/systemd/system
sudo systemctl daemon-reload
sudo systemctl start pucpin-sensores