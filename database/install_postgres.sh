#!/bin/bash

echo instala extras da amazon ec2
sudo amazon-linux-extras install -y epel

echo instala PostgreSQL
sudo tee /etc/yum.repos.d/pgdg.repo<<EOF
[pgdg13]
name=PostgreSQL 13 for RHEL/CentOS 7 - x86_64
baseurl=https://download.postgresql.org/pub/repos/yum/13/redhat/rhel-7-x86_64
enabled=1
gpgcheck=0
EOF

sudo yum install -y postgresql13 postgresql13-server
sudo /usr/pgsql-13/bin/postgresql-13-setup initdb
sudo systemctl enable --now postgresql-13

echo cria o esquema base no banco
sudo chown postgres base-table.sql
sudo -u postgres psql -U postgres -c 'CREATE DATABASE pucpin'
sudo -u postgres psql -U postgres -d pucpin -f base-table.sql

echo coloca password padrao no banco
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"

echo alterando pg_hba.conf
hbaconf=sudo -u postgres psql -t -P format=unaligned -c 'show hba_file';
echo host    all             all              0.0.0.0/0                       md5 >> $hbaconf
echo host    all             all              ::/0                            md5 >> $hbaconf

echo alterando postgresql.conf
postgresconf=sudo -u postgres psql -t -P format=unaligned -c 'show config_file';
searchString="#listen_addresses = 'localhost'"
replaceString="listen_addresses = '*'"
sed -i "s/$searchString/$replaceString" $postgresconf

echo reiniciando postgres
sudo systemctl restart postgresql-13.service
